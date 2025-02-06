import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { createWithEqualityFn } from "zustand/traditional";

export const useBleState = createWithEqualityFn((set, get) => ({
  device: null,
  characteristic: null,
  logs: [],
  uiids: {
    serviceUuid: "170ea494-cb37-4351-8361-40b0b6e3a308",
    characteristicUuid: "8374dda7-30aa-441a-93c0-327f5333b042",
  },

  addLog: (message, type = "") => {
    const { logs } = get();
    const newMessage = { id: uuidv4(), message, type };

    set({ logs: [...logs, newMessage] });
  },
  clearLogs() {
    set({ logs: [] });
  },
  boundHandleCharacteristicValueChanged: (event) => {
    const { addLog } = get();
    const value = new TextDecoder().decode(event.target.value);

    addLog(value, "in");
  },
  boundHandleDisconnection: () => {
    const { device, addLog, connectDeviceAndCacheCharacteristic } = get();
    addLog(
      `"${device.name}"  bluetooth device disconnected, trying to reconnect...`
    );

    connectDeviceAndCacheCharacteristic();
  },

  requestBluetoothDevice: async () => {
    const { addLog, boundHandleDisconnection } = get();

    addLog("Requesting bluetooth device...");
    const device = await navigator.bluetooth.requestDevice({
      filters: [
        {
          namePrefix: "realme",
        },
      ],
      optionalServices: ["170ea494-cb37-4351-8361-40b0b6e3a308"],
    });

    addLog(`${device.name} bluetooth device selected`);
    device.addEventListener("gattserverdisconnected", boundHandleDisconnection);
    set({ device }); // Remember device.
  },
  connectDeviceAndCacheCharacteristic: async () => {
    const { uiids, addLog, device } = get();

    addLog("Connecting to GATT server...");
    const server = await device.gatt.connect();

    addLog("GATT server connected, getting service...");
    const service = await server.getPrimaryService(uiids.serviceUuid);

    addLog("Service found, getting characteristic...");
    const characteristic = await service.getCharacteristic(
      uiids.characteristicUuid
    );

    addLog("Characteristic found");
    set({ characteristic });
  },
  startNotifications: async () => {
    const { addLog, characteristic, boundHandleCharacteristicValueChanged } =
      get();

    addLog("Starting notifications...");
    await characteristic.startNotifications();
    addLog("Notifications started");

    characteristic.addEventListener(
      "characteristicvaluechanged",
      boundHandleCharacteristicValueChanged
    );
  },

  connect: async () => {
    const {
      addLog,
      requestBluetoothDevice,
      connectDeviceAndCacheCharacteristic,
      startNotifications,
    } = get();

    try {
      await requestBluetoothDevice();
      await connectDeviceAndCacheCharacteristic();
      await startNotifications();
    } catch (err) {
      addLog(`Error: ${err.message}`, "err");
    }
  },
  disconnectFromDevice: () => {
    const { addLog, device, boundHandleDisconnection } = get();

    if (!device) return;

    device.removeEventListener(
      "gattserverdisconnected",
      boundHandleDisconnection
    );

    addLog(`Disconnecting from "${device.name}" bluetooth device...`);

    if (!device.gatt.connected) {
      addLog(`"${device.name}" bluetooth device is already disconnected`);
      return;
    }
    device.gatt.disconnect();

    addLog(`"${device.name}" bluetooth device disconnected`);
  },
  disconnect: () => {
    const {
      disconnectFromDevice,
      characteristic,
      boundHandleCharacteristicValueChanged,
    } = get();

    disconnectFromDevice();

    if (characteristic) {
      characteristic.removeEventListener(
        "characteristicvaluechanged",
        boundHandleCharacteristicValueChanged
      );
    }

    set({ device: null, characteristic: null });
  },
  send: (text) => {
    const { devices, currentDeviceId, addLog } = get();
    try {
      text = String(text || "");

      // Return rejected promise immediately if data is empty.
      if (!text) {
        throw new Error("Data must be not empty");
      }

      if (!currentDeviceId) {
        throw new Error("Устройство должно быть выбрано");
      }

      const { sendCharacteristic } = devices.characteristics;
      sendCharacteristic.writeValue(new TextEncoder().encode(text));
      addLog(text, "out");
    } catch (err) {
      addLog(`Error: ${err.message}`, "err");
    }
  },
}));

export const useBluetoothState = createWithEqualityFn((set, get) => ({
  portData: {
    port: {},
    reader: {},
    writer: {},
    keepReading: true,
  },
  logs: [],
  addLog: (message, type = "") => {
    const { logs } = get();
    const newMessage = { id: uuidv4(), message, type };

    set({ logs: [...logs, newMessage] });
  },
  connect: async () => {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);

    let reader;
    const { addLog } = get();

    set((prev) => ({
      portData: {
        ...prev.portData,
        port: port,
        readableStreamClosed,
      },
    }));

    while (port.readable && get().portData.keepReading) {
      reader = textDecoder.readable.getReader();
      set((prev) => ({
        portData: {
          ...prev.portData,
          reader: reader,
        },
      }));

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            console.log("break ");
            // reader.cancel() has been called.
            break;
          }
          // value is a Uint8Array.
          console.log(value);
        }
      } catch (error) {
        // Handle error...
        addLog(`Error: ${err.message}`, "err");
      } finally {
        // Allow the serial port to be closed later.
        reader.releaseLock();
      }
    }

    // await port.close();
  },
  disconnect: async () => {
    const {
      portData: { reader, readableStreamClosed },
      addLog,
    } = get();

    set((prev) => ({
      portData: {
        ...prev.portData,
        keepReading: false,
      },
    }));
    try {
      reader.cancel();
      await readableStreamClosed.catch(() => {
        /* Ignore the error */
      });
      port.close();
    } catch (err) {
      addLog(`Error: ${err.message}`, "err");
    }
  },
  clearLogs() {
    set({ logs: [] });
  },

  send: async (message) => {
    const {
      portData: { port },
      addLog,
    } = get();

    try {
      if (portData.port) {
        throw new Error({ message: "сначала подключитесь" });
      }
      const textEncoder = new TextEncoderStream();
      const writableStreamclosed = textEncoder.readable.pipeTo(port.writable);

      const writer = textEncoder.writable.getWriter();

      await writer.write(message);
      addLog(message, "out");

      writer.close();
      await writableStreamclosed;
    } catch (err) {
      addLog(`Error: ${err.message}`, "err");
    }
  },
}));

export const useWebsocketState = createWithEqualityFn((set, get) => ({
  logs: [],
  webSocket: {},
  addLog: (message, type = "") => {
    const { logs } = get();
    const newMessage = { id: uuidv4(), message, type };

    set({ logs: [...logs, newMessage] });
  },
  connect() {
    const ws = new WebSocket("ws://localhost:8080");
    set({ webSocket: {} });

    ws.onopen = () => {
      const { addLog } = get();
      addLog("Connected to server");
      ws.send("Hello, Server!");
    };

    ws.onmessage = (event) => {
      const { addLog } = get();
      addLog(`Message from server: ${event.data}`, "in");
    };

    ws.onclose = () => {
      const { addLog } = get();
      addLog("Connection closed");
    };
  },
  disconnect() {},
  clearLogs() {},
  send(message) {
    socket.send(message);
  },
}));

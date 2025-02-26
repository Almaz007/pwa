import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { createWithEqualityFn } from "zustand/traditional";

export const useBleState = createWithEqualityFn((set, get) => ({
  device: null,
  characteristics: {},
  logs: [],
  uuids: {
    serviceUuid: "6e400001-b5a3-f393-e0a9-e50e24dcca9e",
    sendCharacteristicUuid: "6e400002-b5a3-f393-e0a9-e50e24dcca9e",
    receiveCharacteristicUuid: "6e400003-b5a3-f393-e0a9-e50e24dcca9e",
  },
  batteryValue: "100",
  options: {
    1: {
      id: 1,
      state: 0,
      color: "red",
    },
    2: {
      id: 2,
      state: 0,
      color: "green",
    },
    3: {
      id: 3,
      state: 0,
      color: "blue",
    },
    4: { id: 4, state: 0 },
  },

  setOptions(id) {
    set((prev) => ({
      options: {
        ...prev.options,
        [id]: { ...prev.options[id], state: !!prev.options[id].state ? 0 : 1 },
      },
    }));
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
    set({ batteryValue: value });
    addLog(value, "in");
  },
  boundHandleDisconnection: () => {
    const { device, addLog, connectDeviceAndCacheCharacteristic } = get();
    addLog(`"${device.name}"  bluetooth device disconnected`);
    // addLog(
    //   `"${device.name}"  bluetooth device disconnected, trying to reconnect...`
    // );

    // connectDeviceAndCacheCharacteristic();
  },

  requestBluetoothDevice: async () => {
    const { addLog, boundHandleDisconnection, uuids } = get();

    addLog("Requesting bluetooth device...");
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: [uuids.serviceUuid],
    });

    addLog(`${device.name} bluetooth device selected`);
    device.addEventListener("gattserverdisconnected", boundHandleDisconnection);
    set({ device }); // Remember device.
  },
  connectDeviceAndCacheCharacteristic: async () => {
    const { uuids, addLog, device } = get();

    addLog("Connecting to GATT server...");
    const server = await device.gatt.connect();

    addLog("GATT server connected, getting service...");
    const service = await server.getPrimaryService(uuids.serviceUuid);

    addLog("Service found, getting characteristic...");
    const sendCharacteristic = await service.getCharacteristic(
      uuids.sendCharacteristicUuid
    );
    const receiveCharacteristic = await service.getCharacteristic(
      uuids.receiveCharacteristicUuid
    );

    addLog("Characteristics found");
    set({ characteristics: { sendCharacteristic, receiveCharacteristic } });
  },
  startNotifications: async () => {
    const {
      addLog,
      characteristics: { receiveCharacteristic },
      boundHandleCharacteristicValueChanged,
    } = get();

    addLog("Starting notifications...");
    await receiveCharacteristic.startNotifications();
    addLog("Notifications started");

    receiveCharacteristic.addEventListener(
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
    const {
      characteristics: { sendCharacteristic },
      device,
      addLog,
    } = get();
    try {
      text = String(text || "");

      // Return rejected promise immediately if data is empty.
      if (!text) {
        throw new Error("нельзя отправить пустые данные");
      }

      if (!device || !sendCharacteristic) {
        throw new Error("необходимо подключиться к устройству");
      }

      sendCharacteristic.writeValue(new TextEncoder().encode(text));

      addLog(text, "out");
    } catch (err) {
      addLog(`Error: ${err.message}`, "err");
    }
  },
  sendGL: (arrUint8) => {
    const {
      characteristics: { sendCharacteristic },
      device,
      addLog,
    } = get();
    try {
      // Return rejected promise immediately if data is empty.
      if (!arrUint8.length) {
        throw new Error("нельзя отправить пустые данные");
      }

      if (!device || !sendCharacteristic) {
        throw new Error("необходимо подключиться к устройству");
      }

      sendCharacteristic.writeValue(arrUint8);

      addLog(text, "out");
    } catch (err) {
      addLog(`Error: ${err.message}`, "err");
    }
  },
}));

export const useUartState = createWithEqualityFn((set, get) => ({
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
    const { addLog } = get();

    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });

      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);

      let reader;
      addLog("Успешное подключение");

      console.log(port);
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
        let buffer = "";

        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
              break;
            }
            if (value) {
              buffer += value; // Накопление строки
              console.log(value);
              if (buffer.includes("\r")) {
                buffer = buffer.slice(0, -1);
                addLog(buffer, "in");
                buffer = "";
              }
            }
          }
        } catch (error) {
          // Handle error...
          addLog(`Error: ${err.message}`, "err");
        } finally {
          // Allow the serial port to be closed later.
          reader.releaseLock();
        }
      }
    } catch (err) {
      addLog(`Error: ${err.message}`, "err");
    }
  },

  disconnect: async () => {
    const {
      portData: { reader, readableStreamClosed, port },
      addLog,
    } = get();
    console.log(port);
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

      addLog("порт успешно закрыт");
    } catch (err) {
      addLog(`Error: ${err.message}`, "err");
    }
  },

  clearLogs() {
    set({ logs: [] });
  },

  send: async (message) => {
    const { portData, addLog } = get();
    const { port } = portData;
    console.log(port);

    try {
      if (!portData.port.connected) {
        throw new Error("сначала подключитесь");
      }
      const textEncoder = new TextEncoderStream();
      const writableStreamclosed = textEncoder.readable.pipeTo(
        portData.port.writable
      );

      const writer = textEncoder.writable.getWriter();

      await writer.write(message);
      addLog(message, "out");

      writer.close();
      await writableStreamclosed;
    } catch (err) {
      console.log(err.message);
      addLog(`Error: ${err.message}`, "err");
    }
  },
}));

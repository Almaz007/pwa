import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { createWithEqualityFn } from "zustand/traditional";
import { formatTimestamp } from "../helpers/helpers";

export const useBleState = createWithEqualityFn((set, get) => ({
  device: null,
  devices: {},
  currentDeviceId: null,
  characteristics: {},
  logs: [],
  uuids: {
    "realme 11": {
      serviceUuid: "f1d43f8b-3778-4efd-a778-1eb6f51e60ff",
      sendCharacteristicUuid: "a4496cd5-ecf9-4d30-b75a-6835db352882",
      batteryCharacteristicUuid: "1c364265-2a7f-4444-9b31-45748e778766",
      timerCharacteristicUuid: "d12aec19-8587-4d3d-815e-7f14852d3d4a",
    },
  },
  batteryValue: "100",
  timerValue: 0,
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
  changeDeviceById: (deviceId) => {
    set({ currentDeviceId: deviceId });
  },
  handleBatteryValueChanged: (event) => {
    const { addLog } = get();

    const int32Array = new Int32Array(event.target.value.buffer); // Создаем Int32Array из ArrayBuffer
    // Получаем значение из Int32Array
    const value1 = int32Array[0];
    // Преобразуем значение в строку
    const stringValue = value1.toString();

    //const value = new TextDecoder().decode(event.target.value, );
    set({ batteryValue: stringValue });
    addLog(stringValue, "in");
  },
  handleTimerValueChanged: (event) => {
    const { addLog } = get();

    const int32Array = new Int32Array(event.target.value.buffer); // Создаем Int32Array из ArrayBuffer
    const value1 = int32Array[0];
    const stringValue = value1.toString();

    set({ timerValue: formatTimestamp(+stringValue) });
    addLog(stringValue, "in");
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
    const { addLog, boundHandleDisconnection, devices, uuids } = get();

    addLog("Requesting bluetooth device...");
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: [uuids["realme 11"].serviceUuid],
    });

    addLog(`${device.name} bluetooth device selected`);

    if (!devices[device.id]) {
      device.addEventListener(
        "gattserverdisconnected",
        boundHandleDisconnection
      );

      set({
        devices: {
          ...devices,
          [device.id]: {
            id: device.id,
            device: device,
            characteristics: {
              sendCharacteristic: null,
              batteryCharacteristic: null,
              timerCharacteristic: null,
            },
          },
        },
      }); // Remember device.
    }

    set({
      currentDeviceId: device.id,
    });
  },
  connectDeviceAndCacheCharacteristic: async () => {
    const { uuids, addLog, devices, currentDeviceId } = get();
    const { device } = devices[currentDeviceId];

    addLog("Connecting to GATT server...");
    const server = await device.gatt.connect();

    addLog("GATT server connected, getting service...");
    // const service = await server.getPrimaryService(uuids.serviceUuid);
    const service = await server.getPrimaryService(
      uuids[device.name].serviceUuid
    );

    addLog("Service found, getting characteristic...");
    const characteristics = await service.getCharacteristics();

    for (const characteristic of characteristics) {
      console.log(characteristic.getDescriptors());
    }

    const sendCharacteristicDevice = await service.getCharacteristic(
      uuids[device.name].sendCharacteristicUuid
    );
    const batteryCharacteristicDevice = await service.getCharacteristic(
      uuids[device.name].batteryCharacteristicUuid
    );
    const timerCharacteristicDevice = await service.getCharacteristic(
      uuids[device.name].timerCharacteristicUuid
    );

    addLog("Characteristics found");

    const { sendCharacteristic, batteryCharacteristic, timerCharacteristic } =
      devices[currentDeviceId].characteristics;

    if (!sendCharacteristic && !batteryCharacteristic && !timerCharacteristic) {
      set({
        devices: {
          ...devices,
          [currentDeviceId]: {
            ...devices[currentDeviceId],
            characteristics: {
              sendCharacteristic: sendCharacteristicDevice,
              batteryCharacteristic: batteryCharacteristicDevice,
              timerCharacteristic: timerCharacteristicDevice,
            },
          },
        },
      });
    }
  },
  startNotifications: async () => {
    const {
      addLog,
      devices,
      handleBatteryValueChanged,
      handleTimerValueChanged,
      currentDeviceId,
    } = get();

    addLog("Starting notifications...");
    const { batteryCharacteristic, timerCharacteristic } =
      devices[currentDeviceId].characteristics;

    addLog("Starting notifications...");
    await batteryCharacteristic.startNotifications();
    await timerCharacteristic.startNotifications();
    addLog("Notifications started");

    batteryCharacteristic.addEventListener(
      "characteristicvaluechanged",
      handleBatteryValueChanged
    );
    timerCharacteristic.addEventListener(
      "characteristicvaluechanged",
      handleTimerValueChanged
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
  disconnectFromDevice: (device) => {
    const { addLog, boundHandleDisconnection } = get();

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
      devices,
      handleBatteryValueChanged,
      handleTimerValueChanged,
      currentDeviceId,
    } = get();

    if (!Object.keys(devices).length && !currentDeviceId) return;

    const deviceInfo = devices[currentDeviceId];
    disconnectFromDevice(deviceInfo.device);

    const { batteryCharacteristic, timerCharacteristic } =
      deviceInfo.characteristics;

    if (batteryCharacteristic && timerCharacteristic) {
      batteryCharacteristic.removeEventListener(
        "characteristicvaluechanged",
        handleBatteryValueChanged
      );
      timerCharacteristic.removeEventListener(
        "characteristicvaluechanged",
        handleTimerValueChanged
      );
    }

    const newDevices = { ...devices };
    delete newDevices[currentDeviceId];

    const newCurrentDeviceId = Object.values(devices)[0]
      ? null
      : Object.values(devices)[0].id;
    set({ devices: newDevices, currentDeviceId: newCurrentDeviceId });
  },
  send: (text) => {
    const { devices, currentDeviceId, addLog } = get();
    try {
      text = String(text || "");

      // Return rejected promise immediately if data is empty.
      if (!text) {
        throw new Error("нельзя отправить пустые данные");
      }

      if (!currentDeviceId) {
        throw new Error("Устройство должно быть выбрано");
      }

      const { sendCharacteristic } = devices[currentDeviceId].characteristics;
      sendCharacteristic.writeValue(new TextEncoder().encode(text));
      addLog(text, "out");
    } catch (err) {
      addLog(`Error: ${err.message}`, "err");
    }
  },
  sendGL: (arrUint8) => {
    const { devices, currentDeviceId, addLog } = get();
    try {
      // Return rejected promise immediately if data is empty.
      if (!arrUint8.length) {
        throw new Error("нельзя отправить пустые данные");
      }

      if (!currentDeviceId) {
        throw new Error("Устройство должно быть выбрано");
      }
      const { sendCharacteristic } = devices[currentDeviceId].characteristics;
      sendCharacteristic.writeValue(arrUint8);

      // addLog(text, "out");
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

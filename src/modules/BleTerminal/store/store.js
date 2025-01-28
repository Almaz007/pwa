import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export const useBluetoothState = create((set, get) => ({
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
}));

import { useState, useMemo } from "react";
import { connectionTypes } from "../constants/constatns";
import { shallow } from "zustand/shallow";
import {
  useBleState,
  useBluetoothState,
  useWebsocketState,
} from "../store/store";
import {
  bleSelector,
  bluetoothSelector,
  webSocketSelector,
} from "../store/selectors";

export const useTermianl = () => {
  const {
    connect: connectBle,
    disconnect: disconnectBle,
    logs: bleLogs,
    clearLogs: bleClearLogs,
    send: bleSend,
  } = useBleState(bleSelector, shallow);

  const {
    connect: connectBluetooth,
    disconnect: disconnectBluetooth,
    logs: BluetoothLogs,
    clearLogs: BluetoothClearLogs,
    send: BluetoothSend,
  } = useBluetoothState(bluetoothSelector, shallow);
  const {
    connect: connectWebSocket,
    disconnect: disconnectWebSocket,
    logs: WebSocketLogs,
    clearLogs: WebSocketClearLogs,
    send: WebSocketSend,
  } = useWebsocketState(webSocketSelector, shallow);

  const [connectionType, setConnectionType] = useState(connectionTypes[1]);
  const [text, setText] = useState("");

  const { connect, disconnect, logs, clearLogs, send } = useMemo(() => {
    const connections = {
      ble: {
        connect: connectBle,
        disconnect: disconnectBle,
        logs: bleLogs,
        clearLogs: bleClearLogs,
        send: bleSend,
      },
      bluetooth: {
        connect: connectBluetooth,
        disconnect: disconnectBluetooth,
        logs: BluetoothLogs,
        clearLogs: BluetoothClearLogs,
        send: BluetoothSend,
      },
      webSocket: {
        connect: connectWebSocket,
        disconnect: disconnectWebSocket,
        logs: WebSocketLogs,
        clearLogs: WebSocketClearLogs,
        send: WebSocketSend,
      },
    };

    return connections[connectionType];
  }, [connectionType, bleLogs, BluetoothLogs]);

  return {
    connectionType,
    setConnectionType,
    text,
    setText,
    logs,
    clearLogs,
    send,
    connect,
    disconnect,
  };
};

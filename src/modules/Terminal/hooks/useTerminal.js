import { useState, useMemo } from "react";
import { connectionTypes } from "../constants/constatns";
import { shallow } from "zustand/shallow";
import { useBleState, useUartState } from "../store/store";
import { bleSelector, uartSelector } from "../store/selectors";

export const useTermianl = () => {
  const {
    connect: connectBle,
    disconnect: disconnectBle,
    logs: bleLogs,
    clearLogs: bleClearLogs,
    send: bleSend,
  } = useBleState(bleSelector, shallow);

  const {
    connect: connectUart,
    disconnect: disconnectUart,
    logs: UartLogs,
    clearLogs: UartClearLogs,
    send: UartSend,
  } = useUartState(uartSelector, shallow);

  const [connectionType, setConnectionType] = useState(connectionTypes[0]);
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
      uart: {
        connect: connectUart,
        disconnect: disconnectUart,
        logs: UartLogs,
        clearLogs: UartClearLogs,
        send: UartSend,
      },
    };

    return connections[connectionType];
  }, [connectionType, bleLogs, UartLogs]);

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

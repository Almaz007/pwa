export const bleSelector = (store) => ({
  connect: store.connect,
  disconnect: store.disconnect,
  logs: store.logs,
  clearLogs: store.clearLogs,
  send: store.send,
});

export const uartSelector = (store) => ({
  connect: store.connect,
  disconnect: store.disconnect,
  logs: store.logs,
  clearLogs: store.clearLogs,
  send: store.send,
});

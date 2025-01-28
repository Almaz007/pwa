import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

export const useMenu = create((set, get) => ({
  historyChoices: [],
  errMessage: "",

  fetchHistoryChoices: async () => {
    try {
      const historyChoices = await api.getHistoryChoices();

      set({ historyChoices });
    } catch (err) {
      set({ errMessage: err.message });
    }
  },
  addHistoryChoice: async (text) => {
    const { historyChoices } = get();

    try {
      const res = await api.addChoice({ punkt: text });
      set({ historyChoices: [...historyChoices, res] });
    } catch (err) {
      set({ errMessage: err.message });
    }
  },
  portConnect: async (cb) => {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();

    console.log("успешно");
    // Listen to data coming from the serial device.
    while (port.readable) {
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            // Allow the serial port to be closed later.
            reader.releaseLock();
            break;
          }
          if (value) {
            console.log(value);
            cb(value);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  },

  backToHistoryChoices: async () => {
    const { historyChoices } = get();
    console.log(historyChoices);

    try {
      const choiceId = historyChoices[historyChoices.length - 1]?.id;
      if (!choiceId) throw new Error("пусто");

      const res = await api.removeChoiceById(choiceId);
      console.log(res);

      set({
        historyChoices: historyChoices.filter(
          (choice) => choice.id !== choiceId
        ),
        errMessage: "",
      });
    } catch (err) {
      console.log(err);
      set({ errMessage: err.message });
    }
  },
}));

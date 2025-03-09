import { createWithEqualityFn } from "zustand/traditional";

export const useIndicationsState = createWithEqualityFn((set, get) => ({
  indications: {},
  setIndications(newIndications) {
    set({ indications: { ...newIndications } });
  },
}));

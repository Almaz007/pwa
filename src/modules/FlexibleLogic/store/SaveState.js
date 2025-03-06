import { createWithEqualityFn } from "zustand/traditional";
import { instructions } from "../constants/primitivesData";

export const useSaveState = createWithEqualityFn((set, get) => ({
  processorType: Object.keys(instructions)[0],
  saveType: "files",

  changeProcessorType: (type) => {
    set({ processorType: type });
  },
  changeSaveType: (type) => {
    set({ saveType: type });
  },
}));

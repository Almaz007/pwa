import { useEffect } from "react";
import { useLogicalEditor } from "../store/store";

export const useOffsetData = (updateNodeData, id) => {
  const [boolOffsets, setBoolOffsets, addBoolOffset] = useLogicalEditor(
    (store) => [
      store.offsets.boolOffsets,
      store.setBoolOffsets,
      store.addBoolOffset,
    ]
  );

  useEffect(() => {
    const offsets = [...boolOffsets];
    const resultOffset = offsets.shift();
    updateNodeData(id, { resultOffset });
    setBoolOffsets(offsets);

    return () => {
      addBoolOffset(resultOffset);
    };
  }, []);
};

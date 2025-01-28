import { useState, useEffect } from "react";
import { generateHandles } from "../helpers/helpers";

export const useHandleData = (
  updateNodeData,
  id,
  computeLogic,
  handlesCount
) => {
  const [handlesValues, setHandlesValues] = useState(() =>
    generateHandles(handlesCount)
  );

  // useEffect(() => {
  //   const values = Object.values(handlesValues).filter((v) => v !== undefined);
  //   const result = computeLogic(values);
  //   updateNodeData(id, { value: result });
  // }, [handlesValues]);

  const handleData = (value, handleId) => {
    setHandlesValues((prev) => ({ ...prev, [handleId]: value }));
  };

  return { handlesValues, handleData };
};

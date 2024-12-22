import { useState, useEffect } from "react";

export const useHandleData = (updateNodeData, id, computeLogic) => {
  const [handlesValues, setHandlesValues] = useState({});

  useEffect(() => {
    const values = Object.values(handlesValues).filter((v) => v !== undefined);
    const result = computeLogic(values);
    updateNodeData(id, { value: result });
  }, [handlesValues]);

  const handleData = (value, handleId) => {
    setHandlesValues((prev) => ({ ...prev, [handleId]: value }));
  };

  return handleData;
};

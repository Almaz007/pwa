import { Handle, Position, useReactFlow } from "@xyflow/react";
import { InputNodeView } from "./InputNodeView";
import { useLogicalEditor } from "../../../../store/store";
import { useEffect } from "react";

export const InputNode = ({ id, width, height, data }) => {
  const [boolOffsets, setBoolOffsets] = useLogicalEditor((store) => [
    store.offsets.boolOffsets,
    store.setBoolOffsets,
  ]);
  const { value, resultOffset } = data;
  const { updateNodeData } = useReactFlow();

  useEffect(() => {
    const offsets = [...boolOffsets];
    updateNodeData(id, { resultOffset: offsets.shift() });
    setBoolOffsets(offsets);
  }, []);

  return (
    <>
      <Handle
        type="source"
        position={Position.Right}
        style={{
          right: "-5px",
        }}
      />
      <InputNodeView
        width={width}
        height={height}
        // disabled={true}
      />
    </>
  );
};

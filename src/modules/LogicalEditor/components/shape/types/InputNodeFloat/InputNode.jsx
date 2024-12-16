import { Handle, Position, useReactFlow } from "@xyflow/react";
import { InputNodeFloatView } from "./InputNodeView";

export const InputNodeFloat = ({ id, width, height, data }) => {
  const { value } = data;
  const { updateNodeData } = useReactFlow();

  return (
    <>
      <Handle
        type="source"
        position={Position.Right}
        style={{
          right: "-5px",
        }}
      />
      <InputNodeFloatView
        width={width}
        height={height}
        // disabled={true}
      />
    </>
  );
};

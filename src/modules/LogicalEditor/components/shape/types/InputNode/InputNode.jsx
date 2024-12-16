import { Handle, Position, useReactFlow } from "@xyflow/react";
import { InputNodeView } from "./InputNodeView";

export const InputNode = ({ id, width, height, data }) => {
  const { value } = data;
  const { updateNodeData } = useReactFlow();

  return (
    <>
      {id}
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

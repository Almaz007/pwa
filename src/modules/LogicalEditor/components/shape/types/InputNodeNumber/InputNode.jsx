import { Handle, Position, useReactFlow } from "@xyflow/react";
import { InputNodeNumberView } from "./InputNodeView";

export const InputNodeNumber = ({ id, width, height, data }) => {
  const { value } = data;
  const { updateNodeData } = useReactFlow();

  return (
    <>
      <Handle
        type="source"
        position={Position.Right}
        style={{
          right: "-7px",
        }}
      />
      <InputNodeNumberView
        width={width}
        height={height}
        // disabled={true}
      />
    </>
  );
};

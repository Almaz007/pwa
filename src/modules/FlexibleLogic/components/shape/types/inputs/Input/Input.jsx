import { Handle, Position, useReactFlow } from "@xyflow/react";

export const Input = ({ id, width, height, data, ViewComponent }) => {
  const { value, resultOffset, dataType } = data;
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
      <ViewComponent width={width} height={height} />
    </>
  );
};

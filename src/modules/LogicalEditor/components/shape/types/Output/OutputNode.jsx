import { Handle, Position, useReactFlow } from "@xyflow/react";
import { OutputNodeView } from "./OutputNodeView";

export const OutputNode = ({ id, width, height, data }) => {
  const { value, resultOffset } = data;
  const { updateNodeData } = useReactFlow();

  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <OutputNodeView
        width={width}
        height={height}
        // disabled={true}
      />
    </div>
  );
};

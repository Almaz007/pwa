import { NotOperationView } from "./NotOperationView";
import { Position, Handle } from "@xyflow/react";

export const NotOperation = ({ width, height }) => {
  return (
    <>
      <Handle type="target" position={Position.Left} style={{ left: "-4px" }} />
      <NotOperationView width={width} height={height} />
      <Handle
        type="source"
        position={Position.Right}
        style={{ right: "-4px" }}
      />
    </>
  );
};

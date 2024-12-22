import { Handle, useHandleConnections, useNodesData } from "@xyflow/react";
import { useEffect } from "react";

const CustomHandle = ({ id, position, handleData, connectionsCount }) => {
  const connections = useHandleConnections({
    type: "target",
    id,
  });
  const nodeData = useNodesData(connections?.[0]?.source);

  useEffect(() => {
    handleData(nodeData?.data ? nodeData.data.value : undefined, id);
  }, [nodeData]);

  return (
    <Handle
      isConnectable={connections.length < connectionsCount}
      type={"target"}
      id={id}
      position={position}
    />
  );
};

export default CustomHandle;

import {
  Handle,
  useHandleConnections,
  useNodesData,
  Position,
} from "@xyflow/react";
import styles from "./OutputNode.module.css";
import CustomNodeToolbar from "../CustomNodeToolbar/CustomNodeToolbar";
import useToolbar from "../../hooks/useToolbar";
import { OutputNodeView } from "./OutputNodeView";

const OutputNode = ({ id, data }) => {
  const connections = useHandleConnections({
    type: "target",
    id: "out",
  });
  const { onDelete, onDetach, hasParent } = useToolbar(id);
  const node = useNodesData(connections?.[0]?.source);
  const value = node?.data?.value;

  return (
    <div className={styles["output__node"]}>
      <div className={styles["centerValue"]}>
        {value === undefined || value === null ? "нет результатов" : `${value}`}
      </div>
      <OutputNodeView />
      <Handle
        type="target"
        id="out"
        position={Position.Left}
        isConnectable={connections.length < 1}
      />
    </div>
  );
};

export default OutputNode;

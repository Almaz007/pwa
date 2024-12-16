import { Handle, Position, useReactFlow } from "@xyflow/react";
import styles from "./LogicAnd.module.css";
import { useEffect, useState } from "react";
import CustomHandle from "../CustomHandle/CustomHandle";
import CustomNodeToolbar from "../CustomNodeToolbar/CustomNodeToolbar";
import useToolbar from "../../hooks/useToolbar";

const LogicAnd = function LogicAnd({ id, data }) {
  const { updateNodeData } = useReactFlow();

  const [handlesValues, setHandlesValues] = useState({
    first: undefined,
    second: undefined,
    third: undefined,
  });
  console.log(handlesValues);
  const { onDelete, onDetach, hasParent } = useToolbar(id);
  useEffect(() => {
    const values = Object.values(handlesValues).filter(
      (nodeValue) => nodeValue !== undefined
    );
    const res =
      values.length > 0 ? values.every((nodeValue) => nodeValue) : undefined;
    updateNodeData(id, { value: res });
  }, [handlesValues]);

  const handleData = (value, id) => {
    setHandlesValues((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className={styles["handle__column"]}>
      <div className={styles["node__logo"]}>&</div>
      <div className={styles["id__block"]} style={{ padding: "10px" }}>
        {id}
      </div>
      {Object.keys(handlesValues).map((key) => (
        <div className={styles["handle"]} key={key}>
          <CustomHandle
            id={key}
            position={Position.Left}
            handleData={handleData}
            connectionsCount={1}
          />
        </div>
      ))}
      <CustomNodeToolbar>
        <button onClick={onDelete}>delete</button>
        {hasParent && <button onClick={onDetach}>detach</button>}
      </CustomNodeToolbar>
      <Handle type="source" position={Position.Right} id="output" />
    </div>
  );
};

export default LogicAnd;

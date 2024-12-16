import { Position, useReactFlow, Handle } from "@xyflow/react";
import { TwoXorView } from "./TwoXorView";
import styles from "./TwoXorView.module.css";
import { useState, useEffect } from "react";
import CustomHandle from "../../../CustomHandle/CustomHandle";

export const TwoXor = ({ id, width, height, data }) => {
  const { value } = data;
  const { updateNodeData } = useReactFlow();
  const [handlesValues, setHandlesValues] = useState({
    first: undefined,
    second: undefined,
  });

  useEffect(() => {
    const values = Object.values(handlesValues).filter(
      (nodeValue) => nodeValue !== undefined
    );
    const res =
      values.length > 0
        ? values.reduce((xorResult, nodeValue) => xorResult ^ nodeValue, 0) ===
          1
        : undefined;
    updateNodeData(id, { value: res });
  }, [handlesValues]);

  const handleData = (value, id) => {
    setHandlesValues((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className={styles["node__row"]}>
      <div className={styles["handles__column"]}>
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
      </div>

      <TwoXorView width={width} height={height} />
      <Handle
        type="source"
        position={Position.Right}
        style={{ right: "-4px" }}
      />
    </div>
  );
};

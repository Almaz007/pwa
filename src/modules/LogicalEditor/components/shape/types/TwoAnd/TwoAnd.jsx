import { Position, useReactFlow, Handle } from "@xyflow/react";
import { TwoAndView } from "./TwoAndView";
import styles from "./LogicAndNodeView.module.css";
import { useState, useEffect } from "react";
import CustomHandle from "../../../CustomHandle/CustomHandle";

export const TwoAnd = ({ id, width, height, data }) => {
  const { value } = data;
  const { updateNodeData } = useReactFlow();

  const [handlesValues, setHandlesValues] = useState({
    first: undefined,
    second: undefined,
    third: undefined,
  });

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

      <TwoAndView width={width} height={height} />
      <Handle
        type="source"
        position={Position.Right}
        style={{ right: "-4px" }}
      />
    </div>
  );
};

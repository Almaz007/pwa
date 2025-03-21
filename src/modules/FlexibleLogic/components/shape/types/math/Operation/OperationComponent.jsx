import { Position, useReactFlow, Handle } from "@xyflow/react";
import { useState, useEffect } from "react";
import CustomHandle from "../../../../CustomHandle/CustomHandle";
import styles from "./Operation.module.css";

export const OperationComponent = ({
  id,
  width,
  height,
  data,
  ViewComponent,
}) => {
  const { updateNodeData } = useReactFlow();

  const [handlesValues, setHandlesValues] = useState({
    first: undefined,
    second: undefined,
  });

  // useEffect(() => {
  //   const values = Object.values(handlesValues).filter(
  //     (nodeValue) => nodeValue !== undefined
  //   );
  //   const res =
  //     values.length > 0
  //       ? values.reduce((div, nodeValue) => div / nodeValue)
  //       : undefined;
  //   updateNodeData(id, { value: res });
  // }, [handlesValues]);

  // const handleData = (value, id) => {
  //   setHandlesValues((prev) => ({ ...prev, [id]: value }));
  // };

  return (
    <div className={styles["node__row"]}>
      <div className={styles["handles__column"]}>
        {Object.keys(handlesValues).map((key) => (
          <div className={styles["handle"]} key={key}>
            <CustomHandle
              id={key}
              position={Position.Left}
              handleData={(handleData) => {}}
              connectionsCount={1}
            />
          </div>
        ))}
      </div>

      <ViewComponent width={width} height={height} />

      <Handle
        type="source"
        position={Position.Right}
        style={{ right: "-4px" }}
      />
    </div>
  );
};

export const Div = () => {};

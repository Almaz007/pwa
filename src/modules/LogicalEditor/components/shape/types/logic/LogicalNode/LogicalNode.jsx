import { Position, useReactFlow, Handle } from "@xyflow/react";
import CustomHandle from "../../../../CustomHandle/CustomHandle";
import styles from "./styles.module.css";
import CustomNodeToolbar from "../../../../CustomNodeToolbar/CustomNodeToolbar";
import { generateHandles } from "../../../../../helpers/helpers";
import { useMemo } from "react";

export const LogicalNode = ({
  id,
  width,
  height,
  data,
  computeLogic,
  ViewComponent,
}) => {
  const { updateNodeData } = useReactFlow();

  const handlesValues = useMemo(() => {
    return generateHandles(data.handlesCount);
  }, [data.handlesCount]);

  const changeHandlesCount = (e) => {
    updateNodeData(id, { handlesCount: +e.target.value });
  };

  return (
    <div className={styles["node__row"]}>
      <div className={styles["handles__column"]}>
        {Object.keys(handlesValues).map((key) => (
          <div className={styles["handle"]} key={key}>
            <CustomHandle
              id={key}
              position={Position.Left}
              // handleData={handleData}
              connectionsCount={1}
            />
          </div>
        ))}
      </div>

      <ViewComponent
        width={width}
        height={height}
        handlesCount={data.handlesCount}
      />
      <CustomNodeToolbar>
        <input
          type="number"
          value={data.handlesCount}
          onChange={changeHandlesCount}
        />
      </CustomNodeToolbar>
      <Handle
        type="source"
        position={Position.Right}
        style={{ right: "-4px" }}
      />
    </div>
  );
};

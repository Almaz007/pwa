import { Position, useReactFlow, Handle } from "@xyflow/react";
import { useState } from "react";

import { useHandleData } from "../../../../hooks/useHandleData";
import { generateHandles } from "../../../../helpers/helpers";
import CustomHandle from "../../../CustomHandle/CustomHandle";
import styles from "./styles.module.css";
import { useOffsetData } from "../../../../hooks/useOffsetData";

export const LogicalNode = ({
  id,
  width,
  height,
  data,
  computeLogic,
  ViewComponent,
}) => {
  const { updateNodeData } = useReactFlow();
  const handleData = useHandleData(updateNodeData, id, computeLogic);
  useOffsetData(updateNodeData, id);

  const [handlesValues, setHandlesValues] = useState(() =>
    generateHandles(data.handlesCount)
  );
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

      <ViewComponent
        width={width}
        height={height}
        handlesCount={data.handlesCount}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ right: "-4px" }}
      />
    </div>
  );
};

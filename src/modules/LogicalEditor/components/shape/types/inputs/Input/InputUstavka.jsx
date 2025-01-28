import { Handle, Position, useReactFlow } from "@xyflow/react";
import { InputView } from "./InputView";
// import styles from "./InputNode.module.css";
// import { useOffsetData } from "../../../../hooks/useOffsetData";
import { useState } from "react";
import cn from "classnames";

export const InputUstavka = ({ id, width, height, data }) => {
  const { value, resultOffset } = data;
  const { updateNodeData } = useReactFlow();
  const [inputValue, setInputValue] = useState(0);
  const [visible, setVisible] = useState(false);

  // useOffsetData(updateNodeData, id);

  return (
    <div
      className={styles["ustavka"]}
      onClick={() => setVisible((prev) => !prev)}
    >
      <div
        className={cn(styles["ustavka__block"], {
          [styles["visible"]]: visible,
        })}
      >
        <input
          type="number"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onClick={(event) => event.stopPropagation()}
        />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        style={{
          right: "-5px",
        }}
      />
      <InputNodeView
        width={width}
        height={height}
        // disabled={true}
      />
    </div>
  );
};

import { Handle, Position, useReactFlow } from "@xyflow/react";
import CustomNodeToolbar from "../../../../CustomNodeToolbar/CustomNodeToolbar";
import { useLogicalEditorState } from "../../../../../store/store";
import { shallow } from "zustand/shallow";
import { useMemo } from "react";
import styles from "./Output.module.css";

import { Select } from "../../../../../../../components/UI/Select/Select";

export const Output = ({ id, width, height, data, ViewComponent }) => {
  const { resultOffset, dataType } = data;
  const { updateNodeData } = useReactFlow();

  const [ustavkiValues, setUstavkiValues, ustavkiIndexs, setUstavki] =
    useLogicalEditorState(
      (state) => [
        state.ustavkiValues,
        state.setUstavkiValues,
        state.ustavkiIndexs,
        state.setUstavki,
      ],
      shallow
    );

  const options = useMemo(() => {
    return ustavkiIndexs["int"];
  }, [ustavkiIndexs]);

  const updateUstavkiIndexs = (newOffset) => {
    const indexs = [...ustavkiIndexs["int"]].filter(
      (offset) => offset !== newOffset
    );

    indexs.push(resultOffset);
    setUstavki(indexs, "int");

    updateNodeData(id, { resultOffset: newOffset });

    const bytes = [...ustavkiValues.slice(resultOffset, resultOffset + 4)];

    const newUstavkiValues = [...ustavkiValues];
    newUstavkiValues.splice(resultOffset, 4, 0, 0, 0, 0);
    newUstavkiValues.splice(newOffset, 4, ...bytes);

    setUstavkiValues([...newUstavkiValues]);
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{
          right: "-5px",
        }}
      />
      <CustomNodeToolbar>
        <div className={styles["id"]}>ID: {id}</div>
        <Select
          options={options}
          value={resultOffset}
          onChange={updateUstavkiIndexs}
          label="test"
          placeholder="test"
        />
      </CustomNodeToolbar>
      <ViewComponent width={width} height={height} />
    </>
  );
};

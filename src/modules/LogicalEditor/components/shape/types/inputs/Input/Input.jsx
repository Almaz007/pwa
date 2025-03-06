import { Handle, Position, useReactFlow } from "@xyflow/react";
import CustomNodeToolbar from "../../../../CustomNodeToolbar/CustomNodeToolbar";
import { useLogicalEditorState } from "../../../../../store/store";
import { shallow } from "zustand/shallow";
import { useMemo, useState } from "react";
import styles from "./Input.module.css";
import {
  combineBytesToInt,
  splitIntToBytes,
} from "../../../../../helpers/helpers";
import { CustomSelect } from "../../../../../../../components/UI/CustomSelect/CustomSelect";
import { Select } from "../../../../../../../components/UI/Select/Select";

export const Input = ({ id, width, height, data, ViewComponent }) => {
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
  console.log(ustavkiValues);
  const options = useMemo(() => {
    return ustavkiIndexs[dataType];
  }, [ustavkiIndexs]);

  const updateUstavkiIndexs = (newOffset) => {
    const indexs = [...ustavkiIndexs[dataType]].filter(
      (offset) => offset !== newOffset
    );
    indexs.push(data.sourcesOffsets[0]);
    setUstavki(indexs, dataType);
    const newSourcesOffsets = [...data.sourcesOffsets];
    newSourcesOffsets[0] = newOffset;
    updateNodeData(id, { sourcesOffsets: newSourcesOffsets });

    if (data.dataType === "int") {
      const bytes = [
        ...ustavkiValues.slice(
          data.sourcesOffsets[0],
          data.sourcesOffsets[0] + 4
        ),
      ];

      const newUstavkiValues = [...ustavkiValues];
      newUstavkiValues.splice(data.sourcesOffsets[0], 4, 0, 0, 0, 0);
      newUstavkiValues.splice(newOffset, 4, ...bytes);

      setUstavkiValues([...newUstavkiValues]);
    }
    if (data.dataType === "bool") {
      const value = ustavkiValues[data.sourcesOffsets[0]];
      const newSourcesOffsets = [...data.sourcesOffsets];
      newSourcesOffsets[0] = newOffset;
      updateNodeData(id, { sourcesOffsets: newSourcesOffsets });

      const newUstavkiValues = [...ustavkiValues];
      newUstavkiValues.splice(data.sourcesOffsets[0], 1, 0);
      newUstavkiValues.splice(newOffset, 1, value);

      setUstavkiValues([...newUstavkiValues]);
    }
  };

  return (
    <>
      <Handle
        type="source"
        position={Position.Right}
        style={{
          right: "-5px",
        }}
      />
      <CustomNodeToolbar>
        <div className={styles["id"]}>ID: {id}</div>
        <Select
          options={options}
          value={data.sourcesOffsets[0]}
          onChange={updateUstavkiIndexs}
          label="test"
          placeholder="test"
        />
      </CustomNodeToolbar>
      <ViewComponent width={width} height={height} />
    </>
  );
};

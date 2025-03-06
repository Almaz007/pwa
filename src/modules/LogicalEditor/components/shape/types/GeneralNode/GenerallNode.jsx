import { Position, useReactFlow, Handle } from "@xyflow/react";
import CustomHandle from "../../../CustomHandle/CustomHandle";
import styles from "./styles.module.css";
import CustomNodeToolbar from "../../../CustomNodeToolbar/CustomNodeToolbar";
import {
  combineBytesToInt,
  generateHandles,
  splitIntToBytes,
} from "../../../../helpers/helpers";
import { useMemo } from "react";
import { useLogicalEditorState } from "../../../../store/store";
import { useState } from "react";
import { shallow } from "zustand/shallow";
export const GeneralNode = ({
  id,
  width,
  height,
  data,
  computeLogic,
  ViewComponent,
}) => {
  const { updateNodeData } = useReactFlow();
  const [ustavkiValues, setUstavkiValues] = useLogicalEditorState(
    (state) => [state.ustavkiValues, state.setUstavkiValues],
    shallow
  );
  const index = data.sourcesOffsets[0];
  const value =
    data.dataType === "int"
      ? combineBytesToInt(
          ustavkiValues.slice(
            data.sourcesOffsets[0],
            data.sourcesOffsets[0] + 4
          )
        )
      : ustavkiValues[data.sourcesOffsets[0]];

  const [inputValue, setInputValue] = useState(value);

  const dataType = data.dataType;

  const handlesValues = useMemo(() => {
    return generateHandles(data.handlesCount);
  }, [data.handlesCount]);

  const changeHandlesCount = (e) => {
    updateNodeData(id, { handlesCount: +e.target.value });
  };

  const validate = (value) => {
    if (dataType === "int") {
      const regex = /^\d+$/;
      return regex.test(value);
    }
    if (dataType === "bool") {
      const regex = /^[01]+$/;
      return regex.test(value);
    }
  };

  const changeUstavki = (e) => {
    let value = e.target.value;
    if (!validate(value)) return;
    if (dataType === "int") {
      const bytes = splitIntToBytes(+value);
      const newValues = [...ustavkiValues];
      newValues.splice(index, 4, ...bytes);
      setUstavkiValues([...newValues]);
      setInputValue(value);
      return;
    }
    // console.log(...splitIntToBytes(+value));
    let newUstavki = [...ustavkiValues];
    newUstavki[index] = +value;
    setUstavkiValues([...newUstavki]);
    setInputValue(value);
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
        <div className={styles["id"]}>ID: {id}</div>
        <input
          className={styles["input"]}
          value={inputValue}
          onChange={changeUstavki}
        />
        {/* <TextField
          id="filled-basic"
          value={inputValue}
          onChange={changeUstavki}
          label="Filled"
          variant="filled"
        /> */}
        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
      </CustomNodeToolbar>
      <Handle
        type="source"
        position={Position.Right}
        style={{ right: "-4px" }}
      />
    </div>
  );
};

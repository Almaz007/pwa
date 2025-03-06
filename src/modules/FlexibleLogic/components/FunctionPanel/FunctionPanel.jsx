import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Panel } from "@xyflow/react";
import styles from "./FunctionPanel.module.css";
import ElementsPanel from "../ElementsPanel/ElementsPanel";
import { PanelItem } from "../PanelItem/PanelItem";
import { shallow } from "zustand/shallow";
import { instructions } from "../../constants/primitivesData";
import { useSaveState } from "../../store/SaveState";

const StyledButton = styled(Button)({
  fontSize: "18px",
  textTransform: "lowercase",
});

export const FunctionPanel = ({ saveChanges }) => {
  const processorType = useSaveState((state) => state.processorType, shallow);

  const instructionsProcessor = instructions[processorType];

  return (
    <Panel className={styles["panel"]}>
      <div className={styles["panel__row"]}>
        <ElementsPanel text={"элементы"}>
          {Object.keys(instructionsProcessor).map((type) => (
            <PanelItem type={type} key={type} />
          ))}
        </ElementsPanel>
      </div>
    </Panel>
  );
};

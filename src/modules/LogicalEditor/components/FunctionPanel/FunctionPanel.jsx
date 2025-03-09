import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Panel } from "@xyflow/react";
import styles from "./FunctionPanel.module.css";
import { Link } from "react-router-dom";
import ElementsPanel from "../ElementsPanel/ElementsPanel";
import { ShapeComponents } from "../shape/types";
import { IoMdArrowBack } from "react-icons/io";
import { PanelItem } from "../PanelItem/PanelItem";
import { useLogicalEditorState } from "../../store/store";
import { shallow } from "zustand/shallow";
import { instructions } from "../../store/arrInstructions";

const StyledButton = styled(Button)({
  fontSize: "18px",
  textTransform: "lowercase",
});

export const FunctionPanel = ({ saveChanges }) => {
  const processorType = useLogicalEditorState(
    (state) => state.processorType,
    shallow
  );
  // console.log(processorType);
  const instructionsProcessor = instructions[processorType];
  return (
    <Panel className={styles["panel"]}>
      <div className={styles["panel__row"]}>
        <Link
          to={"/flexibleLogic/logicalEditor"}
          className={styles["back__link"]}
        >
          <StyledButton startIcon={<IoMdArrowBack />} variant="text">
            на главную
          </StyledButton>
        </Link>
        <ElementsPanel text={"элементы"}>
          {Object.keys(instructionsProcessor).map((type) => (
            <PanelItem type={type} key={type} />
          ))}
        </ElementsPanel>
        <ElementsPanel text={"кастомные элементы"}>
          {/* {Object.keys(ShapeComponents).map((type) => (
              <PanelItem type={type} key={type} />
            ))} */}
        </ElementsPanel>
        <ElementsPanel text={"уставки"}>
          {/* <PanelItem type={"inputUstavka"} key={"inputUstavka"} /> */}
        </ElementsPanel>
        <StyledButton variant="contained" onClick={() => saveChanges()}>
          применить
        </StyledButton>
      </div>
    </Panel>
  );
};

import { Link, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import {
  Background,
  Controls,
  ReactFlowProvider,
  ReactFlow,
  Panel,
  ConnectionLineType,
} from "@xyflow/react";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import SelectedNodesToolbar from "../SelectedNodesToolbar/SelectedNodesToolbar.jsx";
import ElementsPanel from "../ElementsPanel/ElementsPanel";
import styles from "./FunctionEditingArea.module.css";
import { proOptions, nodeTypes } from "../../constants/constants.js";
import { useFunctionEditingArea } from "../../hooks/useFunctionEditingArea.js";
import "@xyflow/react/dist/style.css";
const StyledButton = styled(Button)({
  fontSize: "18px",
  textTransform: "lowercase",
});
const defaultEdgeOptions = {
  type: ConnectionLineType.SmoothStep,

  style: { strokeWidth: 2 },
};
function FunctionEditingAreaContent({ id }) {
  const {
    nodes,
    onNodesChange,
    edges,
    onEdgesChange,
    isValidConnection,
    onDragOver,
    onDrop,
    onNodeDragStop,
    onConnect,
    saveChanges,
    convertData,
  } = useFunctionEditingArea(id);

  return (
    <div className={styles["editing__area"]}>
      <div className={styles["flow"]}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          proOptions={proOptions}
          isValidConnection={isValidConnection}
          fitView
          onDragOver={onDragOver}
          onDrop={onDrop}
          onNodeDragStop={onNodeDragStop}
          connectionLineType={ConnectionLineType.SmoothStep}
        >
          <SelectedNodesToolbar />
          <Background />
          <Controls />
          <Panel className={styles["panel"]}>
            <div className={styles["panel__row"]}>
              <Link
                to={"/setpoints/logicalEditor"}
                className={styles["back__link"]}
              >
                <StyledButton startIcon={<IoMdArrowBack />} variant="text">
                  на главную
                </StyledButton>
              </Link>
              <div className={styles["left__row"]}>
                <StyledButton variant="contained" onClick={() => convertData()}>
                  конвертировать
                </StyledButton>
                <StyledButton variant="contained" onClick={() => saveChanges()}>
                  применить
                </StyledButton>
                <ElementsPanel />
              </div>
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

const FunctionEditingArea = () => {
  const { id } = useParams();
  return (
    <ReactFlowProvider>
      <FunctionEditingAreaContent key={id} id={id} />
    </ReactFlowProvider>
  );
};
export default FunctionEditingArea;

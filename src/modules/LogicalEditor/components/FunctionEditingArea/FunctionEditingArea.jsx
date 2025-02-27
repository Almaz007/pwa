import { useParams } from "react-router-dom";
import {
  Background,
  Controls,
  ReactFlowProvider,
  ReactFlow,
  ConnectionLineType,
} from "@xyflow/react";
import SelectedNodesToolbar from "../SelectedNodesToolbar/SelectedNodesToolbar.jsx";
import styles from "./FunctionEditingArea.module.css";
import { proOptions, nodeTypes, edgeTypes } from "../../constants/constants.js";
import { useFunctionEditingArea } from "../../hooks/useFunctionEditingArea.js";
import "@xyflow/react/dist/style.css";
import { FunctionPanel } from "../FunctionPanel/FunctionPanel.jsx";

const defaultEdgeOptions = {
  type: ConnectionLineType.SmoothStep,
  animated: true,
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
          edgeTypes={edgeTypes}
          proOptions={proOptions}
          isValidConnection={isValidConnection}
          fitView
          onDragOver={onDragOver}
          onDrop={onDrop}
          onNodeDragStop={onNodeDragStop}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineType={ConnectionLineType.SmoothStep}
        >
          <SelectedNodesToolbar />
          <Background />
          <Controls />
          <FunctionPanel saveChanges={saveChanges} />
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

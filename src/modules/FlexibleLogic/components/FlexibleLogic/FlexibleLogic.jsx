import {
  Background,
  ConnectionLineType,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  Panel,
} from "@xyflow/react";
import styles from "./FlexibleLogic.module.css";
import { useFlexibleLogic } from "../../hooks/useFlexibleLogic";
import { useDnd } from "../../hooks/useDnd";
import { FunctionPanel } from "../FunctionPanel/FunctionPanel";
import { nodeTypes } from "../../constants/nodeTypes";

const defaultEdgeOptions = {
  type: ConnectionLineType.SmoothStep,
  style: { strokeWidth: 2 },
  animated: false,
};

const FlexibleLogic = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, addEdge } =
    useFlexibleLogic();
  const { onDragOver, onDrop } = useDnd();

  return (
    <div className={styles["flexibleLogic"]}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={addEdge}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Panel position="top-center">
          <FunctionPanel />
        </Panel>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export const FlexibleLogicProvider = () => {
  return (
    <ReactFlowProvider>
      <FlexibleLogic />
    </ReactFlowProvider>
  );
};

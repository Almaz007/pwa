import {
  ReactFlow,
  Background,
  Controls,
  getIncomers,
  Panel,
  ReactFlowProvider,
  ConnectionLineType,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import styles from "./LogicalEditor.module.css";
import SelectedNodesToolbar from "../SelectedNodesToolbar/SelectedNodesToolbar.jsx";
import useLogcalEditor from "../../hooks/useLogicalEditor.jsx";
import { useCopyPaste } from "../../hooks/useCopyPaste.js";
import { Button } from "@mui/material";
import { nodeTypes, proOptions } from "../../constants/constants.js";

function LogicalEditorContent() {
  const snapGrid = [20, 20];
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    addEdge,
    isValidConnection,
  } = useLogcalEditor();

  const convertData = () => {
    let num = 0;
    const newArr = {};
    const outputNodes = nodes.filter((node) => node.type === "outputNode");

    const func = (node, visited = new Set()) => {
      newArr[node.id] = node;
      newArr[node.id]["sources"] = [];

      for (const incomer of getIncomers(node, nodes, edges)) {
        newArr[node.id]["sources"].push(incomer.id);
        func(incomer, visited);
        num++;
        newArr[incomer.id].number = num;
      }
    };
    if (!outputNodes.length) return;
    func(outputNodes[0]);
    newArr[outputNodes[0].id].number = ++num;

    const res = Object.values(newArr).sort((node1, node2) =>
      node1.number > node2.number ? 1 : -1
    );
    console.log(res);
  };
  const { cut, copy, paste, bufferedNodes } = useCopyPaste();

  const canCopy = nodes.some(({ selected }) => selected);
  const canPaste = bufferedNodes.length > 0;

  const defaultEdgeOptions = {
    type: ConnectionLineType.SmoothStep,

    style: { strokeWidth: 2 },
  };
  return (
    <div className={styles["logical__editor"]}>
      <div className={styles["configuration"]}></div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={addEdge}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        // onDrop={onDrop}
        // onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        // onNodeDrag={onNodeDrag}
        fitView
        proOptions={proOptions}
        isValidConnection={isValidConnection}
        snapToGrid={true}
        snapGrid={snapGrid}
      >
        <Panel className={styles["button__group"]} position="top-center">
          {/* <Button variant="contained" onClick={() => cut()} disabled={!canCopy}>
            cut
          </Button>
          <Button
            variant="contained"
            onClick={() => copy()}
            disabled={!canCopy}
            className={styles["panel__btn"]}
          >
            copy
          </Button>
          <Button
            variant="contained"
            onClick={() => paste({ x: 0, y: 0 })}
            disabled={!canPaste}
            className={styles["panel__btn"]}
          >
            paste
          </Button> */}
          <Button variant="contained" onClick={convertData}>
            save
          </Button>
        </Panel>

        <SelectedNodesToolbar />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

const LogicalEditor = () => {
  const newKey = new Date();
  return (
    <ReactFlowProvider>
      <LogicalEditorContent key={newKey} />
    </ReactFlowProvider>
  );
};
export default LogicalEditor;

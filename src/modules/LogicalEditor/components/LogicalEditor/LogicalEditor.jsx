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
import useLogcalEditor from "../../hooks/useLogicalEditor.js";
import { useCopyPaste } from "../../hooks/useCopyPaste.js";
import { Button } from "@mui/material";
import { edgeTypes, nodeTypes, proOptions } from "../../constants/constants.js";
import { CustomSelect } from "../../../../components/UI/CustomSelect/CustomSelect.jsx";

function LogicalEditorContent() {
  const snapGrid = [20, 20];
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    addEdge,
    isValidConnection,
    saveConfig,
    processorType,
    changeProcessorType,
    saveType,
    changeSaveType,
    connectBluetooth,
    port,
  } = useLogcalEditor();
  console.log(port);
  const { cut, copy, paste, bufferedNodes } = useCopyPaste();
  const canCopy = nodes.some(({ selected }) => selected);
  const canPaste = bufferedNodes.length > 0;

  const defaultEdgeOptions = {
    type: ConnectionLineType.SmoothStep,
    style: { strokeWidth: 2 },
  };

  console.log(processorType);

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
        edgeTypes={edgeTypes}
        proOptions={proOptions}
        isValidConnection={isValidConnection}
        snapToGrid={true}
        snapGrid={snapGrid}
      >
        <Panel className={styles["button__group"]} position="top-center">
          <CustomSelect
            values={["ARM", "RISCV"]}
            label={"processor type"}
            value={processorType}
            handleChange={(e) => changeProcessorType(e.target.value)}
          />
          <CustomSelect
            values={["bluetooth", "files"]}
            label={"save type"}
            value={saveType}
            handleChange={(e) => changeSaveType(e.target.value)}
          />
          {saveType === "bluetooth" && (
            <>
              <Button
                variant="contained"
                sx={{ minWidth: 90 }}
                onClick={connectBluetooth}
              >
                connect
              </Button>
              <Button
                variant="contained"
                onClick={saveConfig}
                sx={{ minWidth: 90 }}
                disabled={!port}
              >
                save
              </Button>
            </>
          )}
          {saveType === "files" && (
            <>
              <Button
                variant="contained"
                onClick={saveConfig}
                sx={{ minWidth: 90 }}
              >
                save
              </Button>
            </>
          )}
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

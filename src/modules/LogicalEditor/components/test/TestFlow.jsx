import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import InputNode from "../InputNode/Inputnode";
import LogicAnd from "../LogicAnd/LogicAnd";
import OutputNode from "../OutputNode/OutputNode";

const initialNodes = [
  {
    id: "1",
    data: { value: false },
    position: { x: 0, y: 0 },
    type: "inputNode",
  },
  {
    id: "2",
    data: { value: false },
    position: { x: 100, y: 100 },
    type: "LogicAnd",
  },
  {
    id: "3",
    position: { x: 300, y: 300 },
    type: "output",
  },
];
const initialEdges = [
  {
    source: "1",
    target: "2",
    targetHandle: "second",
    id: "xy-edge__1-2second",
  },
  {
    source: "2",
    sourceHandle: "output",
    target: "3",
    targetHandle: "out",
    id: "xy-edge__2output-3out",
  },
];

export const nodeTypes = {
  inputNode: InputNode,
  LogicAnd: LogicAnd,
  output: OutputNode,
};
export const TestFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params) => {
    setEdges((eds) => addEdge(params, eds));
  };
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
    ></ReactFlow>
  );
};

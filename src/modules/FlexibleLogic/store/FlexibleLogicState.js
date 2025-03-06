import { applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { createWithEqualityFn } from "zustand/traditional";
import { v4 as uuidv4 } from "uuid";
export const useFlexibleLogicState = createWithEqualityFn((set, get) => ({
  nodes: [
    {
      id: "1",
      data: { label: "Hello" },
      position: { x: 0, y: 0 },
      type: "input",
    },
    {
      id: "2",
      data: { label: "World" },
      position: { x: 100, y: 100 },
    },
  ],
  edges: [],

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addEdge(data) {
    const id = uuidv4();
    const edge = {
      id,
      ...data,
      animated: false,
    };

    set({ edges: [edge, ...get().edges] });
  },

  addNode(newNode) {
    const { nodes } = get();
    const sortedNodes = [...nodes, newNode];
    set({ nodes: [...sortedNodes] });
  },
}));

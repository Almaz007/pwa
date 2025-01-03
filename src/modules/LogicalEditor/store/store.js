import {
  applyEdgeChanges,
  applyNodeChanges,
  ConnectionLineType,
} from "@xyflow/react";
import { createWithEqualityFn } from "zustand/traditional";
import { v4 as uuidv4 } from "uuid";
import { sortNodes } from "../helpers/helpers";
import { offsets } from "./arrInstructions";

export const useLogicalEditor = createWithEqualityFn((set, get) => ({
  nodes: [],
  edges: [],
  nodeType: null,
  offsets: offsets,

  setBoolOffsets(newBoolOffsets) {
    set((prev) => ({
      offsets: { ...prev.offsets, boolOffsets: newBoolOffsets },
    }));
  },
  addBoolOffset(offset) {
    set((prev) => ({
      offsets: {
        ...prev.offsets,
        boolOffsets: { ...prev.boolOffsets, offset },
      },
    }));
  },
  setNodeType(type) {
    set({ nodeType: type });
  },
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
      animated: true,
      type: ConnectionLineType.SmoothStep,
    };

    set({ edges: [edge, ...get().edges] });
  },

  addNode(newNode) {
    const { nodes } = get();
    const sortedNodes = [...nodes, newNode].sort(sortNodes);
    set({ nodes: [...sortedNodes] });
  },
  setNodes(nodes) {
    set({
      nodes: [...nodes],
    });
  },
  setEdges(edges) {
    set({
      edges: [...edges],
    });
  },
}));

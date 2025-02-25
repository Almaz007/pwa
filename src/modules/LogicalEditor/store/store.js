import {
  applyEdgeChanges,
  applyNodeChanges,
  ConnectionLineType,
} from "@xyflow/react";
import { createWithEqualityFn } from "zustand/traditional";
import { v4 as uuidv4 } from "uuid";
import { sortNodes } from "../helpers/helpers";
import { offsets } from "./arrInstructions";

export const useLogicalEditorState = createWithEqualityFn((set, get) => ({
  nodes: [],
  edges: [],
  nodeType: null,
  port: undefined,
  processorType: "ARM",
  saveType: "files",
  offsetsTypes: {
    bool: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    int: [16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 76],
    float: [
      80, 84, 88, 92, 96, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140,
    ],
  },
  inputTypes: {
    NO_USE: 0,
    bool: {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
    },
    int: {
      2: 8,
      3: 9,
      4: 10,
      5: 11,
      6: 12,
      7: 13,
    },
    float: {
      2: 14,
      3: 15,
      4: 16,
      5: 17,
      6: 18,
      7: 19,
    },
    dobule: {
      2: 20,
      3: 21,
      4: 22,
      5: 23,
      6: 24,
      7: 25,
    },
    TM1: 26,
  },

  // typedef enum {
  //   NO_USE=0,
  //   BOOL2=1,
  //   BOOL3=2,
  //   BOOL4=3,
  //   BOOL5=4,
  //   BOOL6=5,
  //   BOOL7=6,
  //   BOOL8=7,

  //   INT3=8,
  //   INT4=9,
  //   INT5=10,
  //   INT6=11,
  //   INT7=12,
  //   INT8=13,

  //   FLOAT3=14,
  //   FLOAT4=15,
  //   FLOAT5=16,
  //   FLOAT6=17,
  //   FLOAT7=18,
  //   FLOAT8=19,

  //   DOUBLE3=20,
  //   DOUBLE4=21,
  //   DOUBLE5=22,
  //   DOUBLE6=23,
  //   DOUBLE7=24,
  //   DOUBLE8=25,

  //   TM1=26
  // }types ;
  edgesNum: 1,

  setPort(port) {
    set({ port });
  },
  changeProcessorType: (type) => {
    set({ processorType: type });
  },
  changeSaveType: (type) => {
    set({ saveType: type });
  },
  incEdgesNum() {
    set((prev) => ({ edgesNum: prev.edgesNum + 1 }));
  },

  setOffsets(newOffsets, dataType) {
    set((prev) => ({
      offsetsTypes: { ...prev.offsetsTypes, [dataType]: newOffsets },
    }));
  },
  addBoolOffset(offset) {
    set((prev) => ({
      offsets: {
        ...prev.offsets,
        boolOffsets: [...prev.offsets.boolOffsets, offset],
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

import { useCallback } from "react";
import { useFlexibleLogicState } from "../store/FlexibleLogicState";
import { shallow } from "zustand/shallow";

export const useFlexibleLogic = () => {
  const [nodes, edges, onNodesChange, onEdgesChange, addEdge, addNode] =
    useFlexibleLogicState(
      (state) => [
        state.nodes,
        state.edges,
        state.onNodesChange,
        state.onEdgesChange,
        state.addEdge,
        state.addNode,
      ],
      shallow
    );

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    addNode,
    addEdge,
  };
};

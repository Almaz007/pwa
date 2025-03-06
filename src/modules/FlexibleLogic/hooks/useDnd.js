import { useCallback } from "react";
import { useFlexibleLogicState } from "../store/FlexibleLogicState";
import { shallow } from "zustand/shallow";
import { generateNode } from "../helpers/helpers";
import { useReactFlow } from "@xyflow/react";

export const useDnd = () => {
  const addNode = useFlexibleLogicState((state) => state.addNode, shallow);
  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  const onDrop = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/reactflow");

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = generateNode(type, position);

    addNode(newNode);
  };

  return { onDragOver, onDrop };
};

import {
  useNodesState,
  useEdgesState,
  getConnectedEdges,
  getOutgoers,
  useReactFlow,
  addEdge,
  ConnectionLineType,
  getIncomers,
} from "@xyflow/react";
import { useMemo, useCallback, useState, useRef } from "react";
import { useLogicalEditor } from "../store/store";
import {
  generateNode,
  getNodePositionInsideParent,
  sortNodes,
} from "../helpers/helpers";
import { shallow } from "zustand/shallow";
import { meassuredsNodesByType } from "../constants/constants";
import { instructionsData } from "../store/arrInstructions";

export const useFunctionEditingArea = (id) => {
  const {
    nodes: globallNodes,
    edges: globalEdges,
    setNodes: setGlobalNodes,
    setEdges: setGlobalEdges,
  } = useLogicalEditor(
    (store) => ({
      nodes: store.nodes,
      edges: store.edges,
      setNodes: store.setNodes,
      setEdges: store.setEdges,
    }),
    shallow
  );
  const groupPosition = useRef(null);

  const filteredNodes = useMemo(() => {
    return globallNodes.reduce((acc, node) => {
      if (node.id === id) {
        // acc.push({ ...node, position: { x: 0, y: 0 } });
        groupPosition.current = node.position;
        acc.push(node);
      }
      if (node.parentId === id) {
        acc.push(node);
      }

      return acc;
    }, []);
  }, []);

  const filteredEdges = useMemo(() => {
    return getConnectedEdges(filteredNodes, globalEdges).filter((edge) => {
      const isExternalSource = filteredNodes.every((n) => n.id !== edge.source);
      const isExternalTarget = filteredNodes.every((n) => n.id !== edge.target);

      return !(isExternalSource || isExternalTarget);
    });
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(filteredNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(filteredEdges);

  const onConnect = useCallback((params) => {
    setEdges((eds) =>
      addEdge(
        { ...params, animated: true, type: ConnectionLineType.SmoothStep },
        eds
      )
    );
  }, []);

  const { getIntersectingNodes, screenToFlowPosition } = useReactFlow();

  const checkTypes = (connection) => {
    const connectionItems = nodes.filter(
      (node) => node.id === connection.target || node.id === connection.source
    );
    console.log(connectionItems[0].data.dataType);
    console.log(connectionItems[1].data.dataType);
    return (
      connectionItems[0].data.dataType === connectionItems[1].data.dataType
    );
  };

  const isValidConnection = (connection) => {
    // if (!checkTypes(connection)) {
    //   console.log("error types");
    //   return;
    // }

    const target = nodes.find((node) => node.id === connection.target);

    const hasCycle = (node, visited = new Set()) => {
      if (visited.has(node.id)) return false;

      visited.add(node.id);

      for (const outgoer of getOutgoers(node, nodes, edges)) {
        if (outgoer.id === connection.source) return true;
        if (hasCycle(outgoer, visited)) return true;
      }
    };

    if (connection.source === target.id) return false;
    return !hasCycle(target);
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = (event) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");
    console.log(type);
    const { width, height } = meassuredsNodesByType[type];

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const intersections = getIntersectingNodes({
      x: position.x,
      y: position.y,
      width,
      height,
    }).filter((n) => n.type === "groupNode");
    const groupNode = intersections[0];

    const newNode = generateNode(type, position);

    if (groupNode) {
      // if we drop a node on a group node, we want to position the node inside the group
      newNode.position = getNodePositionInsideParent(
        {
          position,
          width,
          height,
        },
        groupNode
      ) ?? { x: 0, y: 0 };
      newNode.parentId = groupNode?.id;
      // newNode.extent = 'parent';
      newNode.expandParent = true;
      setNodes((prev) => [...prev, newNode]);
    }
  };
  const onNodeDragStop = useCallback(
    (_, node) => {
      if (node.type === "groupNode" || node.parentId) {
        return;
      }

      const intersections = getIntersectingNodes(node).filter(
        (n) => n.type === "groupNode"
      );

      if (intersections.length) {
        const groupNode = intersections[0];
        const nextNodes = nodes
          .map((n) => {
            if (n.id === groupNode.id) {
              return {
                ...n,
                className: "",
              };
            } else if (n.id === node.id) {
              const position = getNodePositionInsideParent(n, groupNode) ?? {
                x: 0,
                y: 0,
              };
              console.log(position);
              return {
                ...n,
                position,
                parentId: groupNode.id,
                extent: "parent",
              };
            }

            return n;
          })
          .sort(sortNodes);

        setNodes(nextNodes);
      }
    },
    [getIntersectingNodes, setNodes, nodes]
  );
  const onNodeDrag = (e, node) => {
    if (node.type === " " || node.parentId) {
      return;
    }
    const intersections = getIntersectingNodes(node).filter(
      (n) => n.type === "groupNode"
    );

    const groupClassName = intersections.length ? "active" : "";

    setNodes(
      nodes.map((n) => {
        if (n.type === "groupNode") {
          return {
            ...n,
            className: groupClassName,
          };
        } else if (n.id === node.id) {
          return {
            ...n,
            position: node.position,
          };
        }

        return { ...n };
      })
    );
  };
  const saveChanges = () => {
    console.log(filteredNodes);
    console.log(filteredEdges);

    console.log("globalNodes:", globallNodes);
    const filteredGlobalNodes = globallNodes.filter((node) => {
      if (node.type === "shape") {
        return !(node.parentId === id);
      } else if (node.type === "groupNode") {
        return !(node.id === id);
      }
    });
    console.log("filteredGlobalNodes:", filteredGlobalNodes);

    console.log("globalEdges: ", globalEdges);
    const filteredGlobalEdges = globalEdges.filter(
      (edge) =>
        !filteredEdges.some((filteredEdge) => filteredEdge.id === edge.id)
    );
    console.log("filteredGlobalEdges:", filteredGlobalEdges);

    const newNodes = nodes.map((node) =>
      node.id === id ? { ...node, position: groupPosition.current } : node
    );

    const updatedNodes = [...filteredGlobalNodes, ...newNodes].sort(sortNodes);
    const updatedEdges = [...filteredGlobalEdges, ...edges];
    console.log(updatedNodes);
    console.log(updatedEdges);
    setGlobalNodes(updatedNodes);
    setGlobalEdges(updatedEdges);
  };

  const generateOffsetItem = (instructionData, offsets) => {
    const lastKey = Object.keys(offsets).pop();

    if (!lastKey) {
      return {
        lengthInBytes: instructionData.lengthInBytes,
        offset: 1,
      };
    }

    const lastItem = offsets[lastKey];

    return {
      lengthInBytes: instructionData.lengthInBytes,
      offset: lastItem.offset + lastItem.lengthInBytes,
    };
  };

  const convertData = () => {
    let num = 0;

    const newArr = {};
    const instructionsNames = Object.keys(instructionsData);

    const instructionsBuffer = {
      instructions: [],
      offsets: {},
    };

    const outputNodes = nodes.filter((node) => node.data.type === "outputNode");

    const func = (node, visited = new Set()) => {
      if (visited.has(node.id)) return false;

      visited.add(node.id);

      const type = node?.data?.type;

      if (
        instructionsNames.includes(type) &&
        !(type in instructionsBuffer.offsets)
      ) {
        instructionsBuffer.instructions.push(
          ...instructionsData[type].instruction
        );
        const offsetData = generateOffsetItem(
          instructionsData[type],
          instructionsBuffer.offsets
        );

        instructionsBuffer.offsets[type] = offsetData;
      }

      newArr[node.id] = node;
      newArr[node.id]["sources"] = [];

      for (const incomer of getIncomers(node, nodes, edges)) {
        newArr[node.id]["sources"].push(incomer.id);
        if (!func(incomer, visited) === false) {
          num++;
          newArr[incomer.id].number = num;
        }
      }
    };

    if (!outputNodes.length) return;
    func(outputNodes[0]);
    newArr[outputNodes[0].id].number = ++num;
    const res = Object.values(newArr).sort((node1, node2) =>
      node1.number > node2.number ? 1 : -1
    );
    console.log(res);
    console.log(instructionsBuffer);
  };

  return {
    nodes,
    onNodesChange,
    edges,
    onEdgesChange,
    onConnect,
    isValidConnection,
    onDragOver,
    onDrop,
    onNodeDragStop,
    saveChanges,
    convertData,
  };
};

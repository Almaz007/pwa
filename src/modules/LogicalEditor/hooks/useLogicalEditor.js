import { useReactFlow, getOutgoers, getIncomers } from "@xyflow/react";
import { useLogicalEditorState } from "../store/store";
import { selector } from "../store/selectors";
import { shallow } from "zustand/shallow";
import GroupNode from "../components/GroupNode/GroupNode";
import { useCallback, useMemo } from "react";

import {
  formatArray,
  generateNode,
  getNodePositionInsideParent,
  sortNodes,
  formatBuffer,
  downloadFile,
} from "../helpers/helpers";
import { instructions } from "../store/arrInstructions";

const useLogcalEditor = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    addEdge,
    addNode,
    processorType,
    changeProcessorType,
    saveType,
    changeSaveType,
    port,
    setPort,
  } = useLogicalEditorState(selector, shallow);
  const {
    screenToFlowPosition,
    getIntersectingNodes,
    getNodes,
    getEdges,
    setNodes,
  } = useReactFlow();

  const instructionsData = instructions[processorType];

  const nodeTypes = {
    groupNode: GroupNode,
  };

  const saveFunc = useMemo(() => {
    const saveFiles = (formattedScripts, formattedInstructionsBuffer) => {
      downloadFile(formattedScripts, "scripts.txt", "text/plain");
      downloadFile(formattedInstructionsBuffer, "buffer.txt", "text/plain");
    };
    const saveUart = async (formattedScripts, formattedInstructionsBuffer) => {
      const textEncoder = new TextEncoderStream();
      const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

      const writer = textEncoder.writable.getWriter();

      await writer.write(
        `${formattedScripts}\n\r${formattedInstructionsBuffer}`
      );

      writer.close();
      await writableStreamClosed;
    };

    return saveType === "files" ? saveFiles : saveUart;
  }, [saveType, port]);

  const isValidConnection = (connection) => {
    const nodes = getNodes();
    const edges = getEdges();
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
  const generateNewDataForPrimitive = (
    instructionData,
    offsets,
    lastLength
  ) => {
    if (!offsets.length) {
      return {
        newPrimitiveData: {
          lengthInBytes: instructionData.lengthInBytes,
          offset: 1,
        },
        newOffset: 1,
        lastLength: instructionData.lengthInBytes,
      };
    }

    const newOffset = offsets.slice(-1)[0] + lastLength;
    const newPrimitiveData = {
      lengthInBytes: instructionData.lengthInBytes,
      offset: newOffset,
    };

    return {
      newOffset,
      newPrimitiveData,
      lastLength: instructionData.lengthInBytes,
    };
  };

  const saveConfig = async () => {
    const scripts = [];
    const visited = new Set();

    const instructionsNames = Object.keys(instructionsData);
    const instructionsBuffer = {
      lastLength: 0,
      instructions: [],
      offsets: [],
      primitivesData: {},
    };

    const outputNodes = nodes.filter((node) => node.data.type === "outputNode");

    if (!outputNodes.length) return;

    const generateScript = (node) => {
      const type = node?.data?.type;
      const handlesCount = node?.data?.handlesCount;

      if (type.includes("input")) return;

      if (visited.has(node.id)) return false;
      visited.add(node.id);

      // проверка на то, есть ли тип элемента в списках примитивов, и не добавлена ли она уже до этого в буффер
      //если все хорошо то в буффер добавляется инструкция конкретного примитива, и ифформация о смещении для нее
      if (
        instructionsNames.includes(type) &&
        !instructionsBuffer.primitivesData[type]?.[handlesCount]
      ) {
        instructionsBuffer.instructions.push(
          ...instructionsData[type].instructions[handlesCount].instruction
        );

        const { newOffset, newPrimitiveData, lastLength } =
          generateNewDataForPrimitive(
            instructionsData[type].instructions[handlesCount],
            instructionsBuffer.offsets,
            instructionsBuffer.lastLength
          );

        instructionsBuffer.primitivesData[type] = {
          ...instructionsBuffer.primitivesData[type],
          [handlesCount]: newPrimitiveData,
        };

        instructionsBuffer.offsets.push(newOffset);
        instructionsBuffer.lastLength = lastLength;
      }

      const incomers = getIncomers(node, nodes, edges);
      const scriptItem = {};
      scriptItem["in_type"] = incomers.length;
      scriptItem["instruction"] =
        instructionsBuffer?.primitivesData[type]?.[handlesCount].offset;
      scriptItem["resultOffset"] = node?.data?.resultOffset;
      scriptItem["sourcesOffsets"] = [0, 0, 0, 0, 0, 0, 0];

      scriptItem["sourcesOffsets"];
      incomers.forEach((incomer, index) => {
        generateScript(incomer);
        scriptItem["sourcesOffsets"][index] = incomer.data.resultOffset;
      });

      scripts.push(scriptItem);
    };

    for (const outputNode of outputNodes) {
      //getIncomers здесь, конкретной для каждого выходного узла, будет всегда возвращат один элемент
      for (const incomer of getIncomers(outputNode, nodes, edges)) {
        generateScript(incomer);
      }
    }

    const resultScripts = scripts.map((script) => {
      const result = [];

      for (const key in script) {
        const item = script[key];

        if (Array.isArray(item)) {
          result.push(...item);
        } else {
          result.push(item);
        }
      }

      return result;
    });

    console.log(resultScripts, instructionsBuffer);

    const formattedScripts = formatArray(resultScripts, instructionsBuffer);
    const formattedInstructionsBuffer = formatBuffer(instructionsBuffer);

    saveFunc(formattedScripts, formattedInstructionsBuffer);
  };

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

    const intersections = getIntersectingNodes({
      x: position.x,
      y: position.y,
      width: 230,
      height: 20,
    }).filter((n) => n.type === "groupNode");
    const groupNode = intersections[0];

    const newNode = generateNode(type, position);

    if (groupNode) {
      // if we drop a node on a group node, we want to position the node inside the group
      newNode.position = getNodePositionInsideParent(
        {
          position,
          width: 230,
          height: 20,
        },
        groupNode
      ) ?? { x: 0, y: 0 };
      newNode.parentId = groupNode?.id;
      // newNode.extent = 'parent';
      newNode.expandParent = true;
    }

    addNode(newNode);
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

  const connectBluetooth = async () => {
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    setPort(port);
  };
  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    addEdge,
    nodeTypes,
    isValidConnection,
    onDragOver,
    onDrop,
    onNodeDragStop,
    onNodeDrag,
    saveConfig,
    processorType,
    changeProcessorType,
    saveType,
    changeSaveType,
    connectBluetooth,
    port,
  };
};

export default useLogcalEditor;

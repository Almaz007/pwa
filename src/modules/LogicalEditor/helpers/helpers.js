import {
  getNodePositionWithOrigin,
  getBoundsOfBoxes,
  rectToBox,
  boxToRect,
} from "@xyflow/system";
import { customAlphabet } from "nanoid";
import { meassuredsNodesByType } from "../constants/constants";
import { v4 as uuidv4 } from "uuid";
import { useLogicalEditorState } from "../store/store";

export const getNodePositionInsideParent = (node, groupNode) => {
  const position = node.position ?? { x: 0, y: 0 };
  const nodeWidth = node.width ?? 0;
  const nodeHeight = node.height ?? 0;
  const groupWidth = groupNode.measured.width ?? 0;
  const groupHeight = groupNode.measured.height ?? 0;

  if (position.x < groupNode.position.x) {
    position.x = 0;
  } else if (position.x + nodeWidth > groupNode.position.x + groupWidth) {
    position.x = groupWidth - nodeWidth;
  } else {
    position.x = position.x - groupNode.position.x;
  }

  if (position.y < groupNode.position.y) {
    position.y = 0;
  } else if (position.y + nodeHeight > groupNode.position.y + groupHeight) {
    position.y = groupHeight - nodeHeight;
  } else {
    position.y = position.y - groupNode.position.y;
  }

  return position;
};

const getOffset = (dataType) => {
  if (!dataType) return;

  const { offsetsTypes, setOffsets, addBoolOffset } =
    useLogicalEditorState.getState();
  const offsets = [...offsetsTypes[dataType]];
  const resultOffset = offsets.shift();
  setOffsets(offsets, dataType);

  return resultOffset;
};

const nodeConfigurations = {
  inputBool: { dataType: "bool", type: "inputBool" },
  inputUstavka: {
    dataType: "boolean",
    type: "inputUstavka",
    value: false,
    resultOffset: 0,
  },
  inputFloat: { dataType: "float", type: "inputFloat" },
  inputInt: { dataType: "int", type: "inputInt" },
  xor: { dataType: "bool", type: "xor", handlesCount: 2 },
  and: { dataType: "bool", type: "and", handlesCount: 3 },
  or: { dataType: "bool", type: "or", handlesCount: 3 },
  nand: { dataType: "bool", type: "nand", handlesCount: 3 },
  nor: { dataType: "bool", type: "nor", handlesCount: 3 },
  notOperation: { dataType: "bool", type: "notOperation", handlesCount: 1 },
  sumInt: {
    dataType: "int",
    type: "sumInt",
    operationType: "sum",
    handlesCount: 2,
  },
  sumFloat: {
    dataType: "float",
    type: "sumFloat",
    operationType: "sum",
    handlesCount: 2,
  },
  multInt: {
    dataType: "int",
    type: "multInt",
    operationType: "mult",
    handlesCount: 2,
  },
  multFloat: {
    dataType: "float",
    type: "multFloat",
    operationType: "mult",
    handlesCount: 2,
  },
  subInt: {
    dataType: "int",
    type: "subInt",
    operationType: "sub",
    handlesCount: 2,
  },
  subFloat: {
    dataType: "float",
    type: "subFloat",
    operationType: "sub",
    handlesCount: 2,
  },
  outputNode: { type: "outputNode" },
  muxBool: {
    dataType: "bool",
    type: "muxBool",
    handlesCount: 3,
  },
  muxInt: {
    dataType: "int",
    type: "muxInt",
    handlesCount: 3,
  },
  equalsInt: {
    dataType: "int",
    type: "equalsInt",
    operationType: "equals",
    handlesCount: 2,
  },
  equalsFloat: {
    dataType: "float",
    type: "equalsFloat",
    operationType: "equals",
    handlesCount: 2,
  },
  lessInt: { dataType: "int", type: "lessInt", operationType: "less" },
  lessFloat: { dataType: "float", type: "lessFloat", operationType: "less" },
  moreInt: { dataType: "int", type: "moreInt", operationType: "more" },
  moreFloat: { dataType: "float", type: "moreFloat", operationType: "more" },
};

export const generateNode = (type, position, style) => {
  const nanoid = customAlphabet("12345", 5);
  const id = uuidv4();
  console.log(type);
  if (type === "groupNode") {
    const groupId = nanoid();
    return {
      id: groupId,
      type,
      position,
      data: { name: `function ${groupId}` },
      style: style ?? { width: 600, height: 400 },
    };
  }

  const config = nodeConfigurations[type];

  if (!config) {
    throw new Error(`Unknown node type: ${type}`);
  }

  return {
    id,
    type: "shape",
    position,
    width: meassuredsNodesByType[type]?.width ?? 100,
    height: meassuredsNodesByType[type]?.height ?? 100,
    data: { ...config, resultOffset: getOffset(config.dataType) },
  };
};

export const sortNodes = (a, b) => {
  if (a.type === b.type) {
    return 0;
  }
  return a.type === "groupNode" && b.type !== "groupNode" ? -1 : 1;
};

export const getRelativeNodesBounds = (nodes, nodeOrigin = [0, 0]) => {
  if (nodes.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  const box = nodes.reduce(
    (currBox, node) => {
      const { x, y } = getNodePositionWithOrigin(node, nodeOrigin);

      return getBoundsOfBoxes(
        currBox,
        rectToBox({
          x,
          y,
          width: node?.measured?.width || 0,
          height: node?.measured?.height || 0,
        })
      );
    },
    {
      x: Infinity,
      y: Infinity,
      x2: -Infinity,
      y2: -Infinity,
    }
  );
  return boxToRect(box);
};

export const isEqual = (prev, next) => {
  return (
    prev.minWidth === next.minWidth &&
    prev.minHeight === next.minHeight &&
    prev.hasChildNodes === next.hasChildNodes
  );
};

export const generateHandles = (count) => {
  const handlesNames = {
    0: "first",
    1: "second",
    2: "third",
    3: "fourth",
    4: "fifth",
    5: "sixth",
    6: "seventh",
    7: "eighth",
  };

  return Object.values(handlesNames)
    .slice(0, count)
    .reduce((acc, value) => {
      acc[value] = undefined;
      return acc;
    }, {});
};

export const downloadFile = (fileData, fileName, mimeType) => {
  const blob = new Blob([fileData], { type: mimeType });

  let link = document.createElement("a");
  link.download = fileName;

  let reader = new FileReader();
  reader.readAsDataURL(blob);

  reader.onload = function () {
    link.href = reader.result;
    link.click();
  };
};
export const formatArray = (inputArray, instructionsBuffer) => {
  const sumBytes = instructionsBuffer.instructions.length;

  return `0x10 1<<7 4 ${sumBytes} {${inputArray
    .map((innerArray) => {
      return `{${innerArray.map((num) => `{${num}}`).join(",")}}`;
    })
    .join(",")}} сrс32`;
};
export const formatBuffer = (inputBuffer) => {
  const instructions = inputBuffer.instructions.join(",");
  const offsets = inputBuffer.offsets.join(",");

  let result = `{{${instructions}},{${offsets}}}`;
  return result;
};

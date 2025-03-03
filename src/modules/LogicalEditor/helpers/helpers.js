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
  if (!dataType || dataType === "any") return;

  const { offsetsTypes, setOffsets, addBoolOffset } =
    useLogicalEditorState.getState();
  const offsets = [...offsetsTypes[dataType]];
  const resultOffset = offsets.shift();
  setOffsets(offsets, dataType);

  return resultOffset;
};

const getSourceOffsetUstavki = (dataType) => {
  if (!dataType || dataType === "any") return;

  const { ustavkiIndexs, setUstavki } = useLogicalEditorState.getState();
  const indexs = [...ustavkiIndexs[dataType]];
  const sourcesOffsets = [indexs.shift(), 0, 0, 0, 0, 0, 0];
  setUstavki(indexs, dataType);

  return sourcesOffsets;
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
  outputNode: { type: "outputNode", dataType: "any" },
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
    dataType: "bool",
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
  lessInt: {
    dataType: "bool",
    type: "lessInt",
    operationType: "less",
    handlesCount: 2,
  },
  lessFloat: {
    dataType: "float",
    type: "lessFloat",
    operationType: "less",
    handlesCount: 2,
  },
  moreInt: {
    dataType: "bool",
    type: "moreInt",
    operationType: "more",
    handlesCount: 2,
  },
  moreFloat: {
    dataType: "float",
    type: "moreFloat",
    operationType: "more",
    handlesCount: 2,
  },
  timerInt: {
    dataType: "int",
    name: "timer",
    ustavka: true,
    type: "timerInt",
    operationType: "timer",
    handlesCount: 0,
  },
  сonstInt: {
    dataType: "int",
    name: "constant int",
    ustavka: true,
    type: "сonstInt",
    operationType: "none",
    handlesCount: 0,
  },
  constBoolean: {
    dataType: "bool",
    name: "constant bool",
    ustavka: true,
    type: "constBoolean",
    operationType: "none",
    handlesCount: 0,
  },
  dtrigger: {
    dataType: "bool",
    type: "dtrigger",
    handlesCount: 1,
    handlesCount: 2,
  },
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
    data: {
      ...config,
      resultOffset: getOffset(config.dataType),
      sourcesOffsets: !!config.ustavka
        ? getSourceOffsetUstavki(config.dataType)
        : undefined,
    },
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
function getByteSize(num) {
  if (num >= 0) {
    if (num <= 0xff) return 1; // Uint8 (1 байт)
    if (num <= 0xffff) return 2; // Uint16 (2 байта)
    if (num <= 0xffffffff) return 4; // Uint32 (4 байта)
    return 8; // BigInt (8 байт и больше)
  } else {
    if (num >= -0x80 && num <= 0x7f) return 1; // Int8 (1 байт)
    if (num >= -0x8000 && num <= 0x7fff) return 2; // Int16 (2 байта)
    if (num >= -0x80000000 && num <= 0x7fffffff) return 4; // Int32 (4 байта)
    return 8; // BigInt (8 байт и больше)
  }
}
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
  const sumBytes = inputArray.reduce((acc, items) => acc + items.length, 0);

  return `16 128 1 0 ${splitIntToBytes(sumBytes).join(" ")} ${inputArray
    .map((innerArray) => {
      return innerArray.join(" ");
    })
    .join(" ")}`;
};

export const formatBuffer = (instructionsBuffer) => {
  const sumBytes = instructionsBuffer.instructions.length;
  const instructions = instructionsBuffer.instructions
    .map((item) => parseInt(item))
    .join(" ");
  const offsets = instructionsBuffer.offsets.map((item) => item).join(" ");

  let result = `16 128 2 0 ${splitIntToBytes(sumBytes).join(
    " "
  )} ${instructions}`; //${offsets} crc32`
  return result;
};

export const formatUstavki = () => {
  const { ustavkiValues } = useLogicalEditorState.getState();

  const sumBytes = ustavkiValues.length;

  return `16 128 3 0 ${splitIntToBytes(sumBytes).join(
    " "
  )} ${ustavkiValues.join(" ")}`;
};

export function splitIntToBytes(number) {
  const byteArray = new Uint8Array(4); // Создаем массив для 4 байтов

  // // Извлечение байтов по порядку: старшие сначала
  // byteArray[0] = (number >> 24) & 0xff; // Старший байт
  // byteArray[1] = (number >> 16) & 0xff; // Второй байт
  // byteArray[2] = (number >> 8) & 0xff; // Третий байт
  // byteArray[3] = number & 0xff; // Младший байт

  byteArray[3] = (number >> 24) & 0xff; // Старший байт
  byteArray[2] = (number >> 16) & 0xff; // Второй байт
  byteArray[1] = (number >> 8) & 0xff; // Третий байт
  byteArray[0] = number & 0xff; // Младший байт
  return byteArray;
}
export function combineBytesToInt(byteArray) {
  console.log(byteArray);
  if (byteArray.length !== 4) {
    throw new Error("Массив должен содержать ровно 4 байта");
  }

  return (
    (byteArray[3] << 24) | // Старший байт
    (byteArray[2] << 16) | // Второй байт
    (byteArray[1] << 8) | // Третий байт
    byteArray[0] // Младший байт
  );
}

export const sendBluetooth = async (buffer, scripts) => {
  const textEncoder = new TextEncoderStream();
  const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

  const writer = textEncoder.writable.getWriter();

  await writer.write("hello");
};

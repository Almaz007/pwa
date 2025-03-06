import { v4 as uuidv4 } from "uuid";
import { useFlexibleLogicState } from "../store/FlexibleLogicState";
import { useOffsetsState } from "../store/OffsetsState";
import { nodeConfigurations } from "../constants/nodesConfig";
import { nanoid } from "nanoid";

const getOffset = (dataType) => {
  if (!dataType || dataType === "any") return;

  const { offsetsTypes, setOffsets } = useOffsetsState.getState();
  const offsets = [...offsetsTypes[dataType]];
  const resultOffset = offsets.shift();
  setOffsets(offsets, dataType);

  return resultOffset;
};

const getSourceOffsetUstavki = (dataType) => {
  if (!dataType || dataType === "any") return;

  const { ustavkiIndexs, setUstavki } = useOffsetsState.getState();
  const indexs = [...ustavkiIndexs[dataType]];
  const sourcesOffsets = [indexs.shift(), 0, 0, 0, 0, 0, 0];
  setUstavki(indexs, dataType);

  return sourcesOffsets;
};

export const generateNode = (type, position, style) => {
  // const nanoid = customAlphabet("12345", 5);
  // const id = uuidv4();
  const id = nanoid(8);
  const config = nodeConfigurations[type];

  if (!config) {
    throw new Error(`Unknown node type: ${type}`);
  }

  const { width, height, ...nodeData } = config;

  return {
    id,
    type: "shape",
    position,
    width: width ?? 100,
    height: height ?? 100,
    data: {
      ...nodeData,
      resultOffset: getOffset(nodeData.dataType),
      sourcesOffsets: !!nodeData.ustavka
        ? getSourceOffsetUstavki(nodeData.dataType)
        : undefined,
    },
  };
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

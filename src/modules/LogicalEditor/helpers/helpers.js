import {
  getNodePositionWithOrigin,
  getBoundsOfBoxes,
  rectToBox,
  boxToRect,
} from "@xyflow/system";
import { customAlphabet } from "nanoid";
import { meassuredsNodesByType } from "../constants/constants";
import { v4 as uuidv4 } from "uuid";

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

export const generateNode = (type, position, style) => {
  const nanoid = customAlphabet("12345", 5);
  const id = uuidv4();
  let numForFunction = 0;

  switch (type) {
    case "inputNode": {
      const node = {
        id,
        type: "shape",
        position,
        width: meassuredsNodesByType[type].width,
        height: meassuredsNodesByType[type].height,
        data: {
          dataType: "boolean",
          type: "inputNode",
          value: false,
          resultOffset: 0,
        },
      };
      return node;
    }
    case "inputNodeFloat": {
      const node = {
        id,
        type: "shape",
        position,
        width: meassuredsNodesByType[type].width,
        height: meassuredsNodesByType[type].height,
        data: {
          dataType: "float",
          type: "inputNodeFloat",
          value: 2.5,
        },
      };
      return node;
    }
    case "inputNodeNumber": {
      const node = {
        id,
        type: "shape",
        position,
        width: meassuredsNodesByType[type].width,
        height: meassuredsNodesByType[type].height,
        data: {
          dataType: "number",
          type: "inputNodeNumber",
          value: 5,
        },
      };
      return node;
    }
    case "xor": {
      const node = {
        id,
        type: "shape",
        position,
        width: meassuredsNodesByType[type].width,
        height: meassuredsNodesByType[type].height,
        data: {
          type: "xor",
          dataType: "boolean",
          handlesCount: 2,
          value: undefined,
        },
      };
      return node;
    }
    case "and": {
      const node = {
        id,
        type: "shape",
        position,
        width: meassuredsNodesByType[type].width,
        height: meassuredsNodesByType[type].height,
        data: {
          type: "and",
          dataType: "boolean",
          handlesCount: 3,
          value: undefined,
        },
      };
      return node;
    }
    case "or": {
      const node = {
        id,
        type: "shape",
        position,
        width: meassuredsNodesByType[type].width,
        height: meassuredsNodesByType[type].height,
        data: {
          type: "or",
          dataType: "boolean",
          handlesCount: 3,
          value: undefined,
        },
      };
      return node;
    }

    case "sumInt": {
      const node = {
        id,
        type: "shape",
        position,
        width: meassuredsNodesByType[type].width,
        height: meassuredsNodesByType[type].height,
        data: {
          type: "sumInt",
          dataType: "number",
          operationType: "sum",
          value: undefined,
        },
      };
      return node;
    }

    case "sumFloat": {
      const node = {
        id,
        type: "shape",
        position,
        width: meassuredsNodesByType[type].width,
        height: meassuredsNodesByType[type].height,
        data: {
          type: "sumFloat",
          dataType: "float",
          operationType: "sum",
          value: undefined,
        },
      };
      return node;
    }
    case "multInt": {
      const node = {
        id,
        type: "shape",
        position,
        width: meassuredsNodesByType[type].width,
        height: meassuredsNodesByType[type].height,
        data: {
          type: "multInt",
          dataType: "number",
          operationType: "mult",
          value: undefined,
        },
      };
      return node;
    }
    case "multFloat": {
      const node = {
        id,
        type: "shape",
        position,
        width: meassuredsNodesByType[type].width,
        height: meassuredsNodesByType[type].height,
        data: {
          type: "multFloat",
          dataType: "float",
          operationType: "mult",
          value: undefined,
        },
      };
      return node;
    }
    case "divInt": {
      const node = {
        id,
        type: "shape",
        position,
        width: meassuredsNodesByType[type].width,
        height: meassuredsNodesByType[type].height,
        data: {
          type: "divInt",
          dataType: "number",
          operationType: "div",
          value: undefined,
        },
      };
      return node;
    }
    case "divFloat": {
      const node = {
        id,
        type: "shape",
        position,
        width: meassuredsNodesByType[type].width,
        height: meassuredsNodesByType[type].height,
        data: {
          type: "divFloat",
          dataType: "float",
          operationType: "div",
          value: undefined,
        },
      };
      return node;
    }
    case "outputNode": {
      const node = {
        id,
        type: "shape",
        position,
        width: meassuredsNodesByType[type].width,
        height: meassuredsNodesByType[type].height,
        data: {
          type: "outputNode",
          dataType: "any",
          value: undefined,
        },
      };
      return node;
    }
    case "groupNode": {
      const id = nanoid();
      const node = {
        id: id,
        type,
        position,
        data: {
          name: `function ${id}`,
        },
        style: style ?? {
          width: 600,
          height: 400,
        },
      };
      return node;
    }
  }
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
export const formatArray = (inputArray) => {
  return `{${inputArray
    .map((innerArray) => {
      return `{${innerArray.map((num) => `{${num}}`).join(",")}}`;
    })
    .join(",")}}`;
};
export const formatBuffer = (inputBuffer) => {
  const instructions = inputBuffer.instructions.join(",");
  const offsets = Object.entries(inputBuffer.offsets)
    .sort((a, b) => a[1].offset - b[1].offset)
    .map((item) => item[1].offset)
    .join(",");

  let result = `{{${instructions}},{${offsets}}}`;
  return result;
};

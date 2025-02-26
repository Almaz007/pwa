import GroupNode from "../components/GroupNode/GroupNode";
import { Shape } from "../components/shape";
import CustomEdge from "../components/CustomEdge/CustomEdge";

export const proOptions = { hideAttribution: true };

export const nodeTypes = {
  shape: Shape,
  groupNode: GroupNode,
};
export const edgeTypes = {
  "custom-edge": CustomEdge,
};

export const meassuredsNodesByType = {
  inputBool: {
    width: 210,
    height: 25,
  },
  // inputUstavka: {
  //   width: 210,
  //   height: 25,
  // },
  inputFloat: {
    width: 210,
    height: 25,
  },
  inputInt: {
    width: 210,
    height: 25,
  },
  xor: {
    width: 140,
    height: 125,
  },
  and: {
    width: 140,
    height: 125,
  },
  nand: {
    width: 140,
    height: 125,
  },
  or: {
    width: 140,
    height: 125,
  },
  nor: {
    width: 140,
    height: 125,
  },
  notOperation: {
    width: 99,
    height: 95,
  },
  sumInt: {
    width: 140,
    height: 125,
  },
  sumFloat: {
    width: 140,
    height: 125,
  },
  multInt: {
    width: 140,
    height: 125,
  },
  multFloat: {
    width: 140,
    height: 125,
  },
  subInt: {
    width: 140,
    height: 125,
  },
  subFloat: {
    width: 140,
    height: 125,
  },
  outputNode: {
    width: 210,
    height: 25,
  },
  equalsInt: {
    width: 140,
    height: 125,
  },
  equalsFloat: {
    width: 140,
    height: 125,
  },
  moreInt: {
    width: 140,
    height: 125,
  },
  moreFloat: {
    width: 140,
    height: 125,
  },
  lessInt: {
    width: 140,
    height: 125,
  },
  lessFloat: {
    width: 140,
    height: 125,
  },
  muxBool: {
    width: 140,
    height: 165,
  },
  muxInt: {
    width: 140,
    height: 165,
  },
  timerInt: {
    width: 113,
    height: 125,
  },
  сonstInt: {
    width: 113,
    height: 125,
  },
  constBoolean: {
    width: 113,
    height: 125,
  },
  dtrigger: {
    width: 140,
    height: 125,
  },
};

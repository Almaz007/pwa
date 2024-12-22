import { MarkerType } from "@xyflow/react";
import InputNode from "../components/InputNode/Inputnode";
import OutputNode from "../components/OutputNode/OutputNode";
import LogicAnd from "../components/LogicAnd/LogicAnd";
import GroupNode from "../components/GroupNode/GroupNode";
import { Shape } from "../components/shape";

export const proOptions = { hideAttribution: true };

export const nodeTypes = {
  shape: Shape,
  groupNode: GroupNode,
};

export const meassuredsNodesByType = {
  inputNode: {
    width: 210,
    height: 25,
  },
  inputNodeFloat: {
    width: 210,
    height: 25,
  },
  inputNodeNumber: {
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
  or: {
    width: 140,
    height: 125,
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
  divInt: {
    width: 140,
    height: 125,
  },
  divFloat: {
    width: 140,
    height: 125,
  },
  outputNode: {
    width: 140,
    height: 125,
  },
};

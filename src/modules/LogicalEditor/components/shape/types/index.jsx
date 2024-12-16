import { InputNode } from "./InputNode/InputNode";
import { InputNodeView } from "./InputNode/InputNodeView";
import { TwoXor } from "./TwoXor/TwoXor";
import { TwoXorView } from "./TwoXor/TwoXorView";
import { TwoAnd } from "./TwoAnd/TwoAnd";
import { TwoAndView } from "./TwoAnd/TwoAndView";
import { TwoOr } from "./TwoOr/TwoOr";
import { TwoOrView } from "./TwoOr/TwoOrView";

import { SumInt } from "./sumInt/SumInt";
import { SumIntView } from "./sumInt/SumIntView";
import { SumFloat } from "./sumFloat/SumFloat";
import { SumFloatView } from "./sumFloat/SumFloatView";

import { MultInt } from "./multInt/MultInt";
import { MultIntView } from "./multInt/MultIntView";
import { MultFloat } from "./multFloat/MultFloat";
import { MultFloatView } from "./multFloat/MultFloatView";

import { DivInt } from "./divInt/DivInt";
import { DivIntView } from "./divInt/DivIntView";
import { DivFloat } from "./divFloat/DivFloat";
import { DivFLoatView } from "./divFloat/DivFloatView";
import { InputNodeNumber } from "./InputNodeNumber/InputNode";
import { InputNodeFloat } from "./InputNodeFloat/InputNode";
import { InputNodeNumberView } from "./InputNodeNumber/InputNodeView";
import { InputNodeFloatView } from "./InputNodeFloat/InputNodeView";
import { OutputNodeView } from "../../OutputNode/OutputNodeView";
import OutputNode from "../../OutputNode/OutputNode";
export const ShapeComponents = {
  inputNode: {
    all: InputNode,
    view: InputNodeView,
  },
  inputNodeFloat: {
    all: InputNodeFloat,
    view: InputNodeFloatView,
  },
  inputNodeNumber: {
    all: InputNodeNumber,
    view: InputNodeNumberView,
  },

  twoXor: {
    all: TwoXor,
    view: TwoXorView,
  },
  twoAnd: {
    all: TwoAnd,
    view: TwoAndView,
  },
  twoOr: {
    all: TwoOr,
    view: TwoOrView,
  },
  sumInt: {
    all: SumInt,
    view: SumIntView,
  },
  sumFloat: {
    all: SumFloat,
    view: SumFloatView,
  },
  multInt: {
    all: MultInt,
    view: MultIntView,
  },
  multFloat: {
    all: MultFloat,
    view: MultFloatView,
  },
  divInt: {
    all: DivInt,
    view: DivIntView,
  },
  divFloat: {
    all: DivFloat,
    view: DivFLoatView,
  },
  outputNode: {
    all: OutputNode,
    view: OutputNodeView,
  },
};

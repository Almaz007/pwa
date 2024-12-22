import { InputNode } from "./InputNode/InputNode";
import { InputNodeView } from "./InputNode/InputNodeView";
import { Xor } from "./Xor/Xor";
import { XorView } from "./Xor/XorView";
import { And } from "./And/And";
import { AndView } from "./And/AndView";
import { Or } from "./Or/Or";
import { OrView } from "./Or/OrView";

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

  xor: {
    all: Xor,
    view: XorView,
  },
  and: {
    all: And,
    view: AndView,
  },
  or: {
    all: Or,
    view: OrView,
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

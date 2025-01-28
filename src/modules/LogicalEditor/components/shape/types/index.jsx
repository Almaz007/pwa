import { Xor } from "./logic/Xor/Xor";
import { XorView } from "./logic/Xor/XorView";
import { And } from "./logic/And/And";
import { AndView } from "./logic/And/AndView";
import { NAnd } from "./logic/NAnd/NAnd";
import { NAndView } from "./logic/NAnd/NAndView";
import { Or } from "./logic/Or/Or";
import { OrView } from "./logic/Or/OrView";
import { NOr } from "./logic/NOr/NOr";
import { NOrView } from "./logic/NOr/NOrView";

import { SumInt } from "./math/sumInt/SumInt";
import { SumIntView } from "./math/sumInt/SumIntView";
import { SumFloat } from "./math/sumFloat/SumFloat";
import { SumFloatView } from "./math/sumFloat/SumFloatView";

import { MultInt } from "./math/multInt/MultInt";
import { MultIntView } from "./math/multInt/MultIntView";
import { MultFloat } from "./math/multFloat/MultFloat";
import { MultFloatView } from "./math/multFloat/MultFloatView";

import { InputInt } from "./inputs/InputInt/InputInt";
import { InputIntView } from "./inputs/InputInt/InputIntView";
import { InputFloat } from "./inputs/InpuFloat/InputFloat";
import { InputFloatView } from "./inputs/InpuFloat/InputFloatView";
import { InputBool } from "./inputs/InputBool/InputBool";
import { InputBoolView } from "./inputs/InputBool/InputBoolView";

import { OutputNodeView } from "./Output/OutputNodeView";
import { OutputNode } from "./Output/OutputNode";

// import { InputUstavka } from "./inputs/Input/InputUstavka";
import { MuxBool } from "./MuxBool/MuxBool";
import { MuxBoolView } from "./MuxBool/MuxBoolView";
import { MuxInt } from "./MuxInt/MuxInt";
import { MuxIntView } from "./MuxInt/MuxIntView";

import { NotOperation } from "./logic/NotOperation/NotOperation";
import { NotOperationView } from "./logic/NotOperation/NotOperationView";

import { EqualsInt } from "./math/equalsInt/EqualsInt";
import { EqualsIntView } from "./math/equalsInt/EqualsIntView";

import { EqualsFloat } from "./math/equalsFloat/EqualsFloat";
import { EqualsFloatView } from "./math/equalsFloat/EqualsFloattView";

import { LessFloat } from "./math/lessFloat/LessFloat";
import { LessFloatView } from "./math/lessFloat/LessFloatView";
import { LessInt } from "./math/lessInt/LessInt";
import { LessIntView } from "./math/lessInt/LessIntView";

import { MoreFloat } from "./math/moreFloat/MoreFloat";
import { MoreFloatView } from "./math/moreFloat/MoreFloatView";
import { MoreInt } from "./math/moreInt/MoreInt";
import { MoreIntView } from "./math/moreInt/MoreIntView";
import { SubInt } from "./math/subInt/SubInt";
import { SubIntView } from "./math/subInt/SubIntView";
import { SubFloat } from "./math/subFloat/SubFloat";
import { SubFloatView } from "./math/subFloat/SubFloatView";

export const ShapeComponents = {
  inputInt: {
    all: InputInt,
    view: InputIntView,
  },
  inputBool: {
    all: InputBool,
    view: InputBoolView,
  },
  inputFloat: {
    all: InputFloat,
    view: InputFloatView,
  },
  xor: {
    all: Xor,
    view: XorView,
  },
  and: {
    all: And,
    view: AndView,
  },
  nand: {
    all: NAnd,
    view: NAndView,
  },
  or: {
    all: Or,
    view: OrView,
  },
  nor: {
    all: NOr,
    view: NOrView,
  },
  notOperation: {
    all: NotOperation,
    view: NotOperationView,
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
  subInt: {
    all: SubInt,
    view: SubIntView,
  },
  subFloat: {
    all: SubFloat,
    view: SubFloatView,
  },
  outputNode: {
    all: OutputNode,
    view: OutputNodeView,
  },
  muxBool: {
    all: MuxBool,
    view: MuxBoolView,
  },
  muxInt: {
    all: MuxInt,
    view: MuxIntView,
  },
  equalsInt: {
    all: EqualsInt,
    view: EqualsIntView,
  },
  equalsFloat: {
    all: EqualsFloat,
    view: EqualsFloatView,
  },
  moreInt: {
    all: MoreInt,
    view: MoreIntView,
  },
  moreFloat: {
    all: MoreFloat,
    view: MoreFloatView,
  },
  lessInt: {
    all: LessInt,
    view: LessIntView,
  },
  lessFloat: {
    all: LessFloat,
    view: LessFloatView,
  },
};

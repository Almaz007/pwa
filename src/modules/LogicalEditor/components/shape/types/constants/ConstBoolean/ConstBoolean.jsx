import { GeneralNode } from "../../GeneralNode/GenerallNode";
import { ConstBooleanView } from "./ConstBooleanView";

export const ConstBoolean = (props) => {
  return (
    <GeneralNode
      {...props}
      computeLogic={() => {}}
      ViewComponent={ConstBooleanView}
    />
  );
};

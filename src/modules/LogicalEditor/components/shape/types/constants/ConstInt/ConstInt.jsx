import { GeneralNode } from "../../GeneralNode/GenerallNode";
import { ConstIntView } from "./ConstIntView";

export const ConstInt = (props) => {
  return (
    <GeneralNode
      {...props}
      computeLogic={() => {}}
      ViewComponent={ConstIntView}
    />
  );
};

import { LogicalNode } from "../LogicalNode/LogicalNode";
import { DtriggerView } from "./DtriggerView";

export const Dtrigger = (props) => {
  return (
    <LogicalNode
      {...props}
      computeLogic={() => {}}
      ViewComponent={DtriggerView}
    />
  );
};

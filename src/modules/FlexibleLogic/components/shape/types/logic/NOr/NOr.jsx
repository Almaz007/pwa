import { LogicalNode } from "../LogicalNode/LogicalNode";
import { NOrView } from "./NOrView";

export const NOr = (props) => {
  const computeLogic = (values) =>
    values.length > 0 ? values.some((nodeValue) => nodeValue) : false;

  return (
    <LogicalNode
      {...props}
      computeLogic={computeLogic}
      ViewComponent={NOrView}
    />
  );
};

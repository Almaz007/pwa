import { LogicalNode } from "../LogicalNode/LogicalNode";
import { NAndView } from "./NAndView";

export const NAnd = (props) => {
  const computeLogic = (values) =>
    values.length > 0 ? values.every(Boolean) : false;

  return (
    <LogicalNode
      {...props}
      computeLogic={computeLogic}
      ViewComponent={NAndView}
    />
  );
};

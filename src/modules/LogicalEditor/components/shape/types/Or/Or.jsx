import { LogicalNode } from "../LogicalNode/LogicalNode";
import { OrView } from "./OrView";

export const Or = (props) => {
  const computeLogic = (values) =>
    values.length > 0 ? values.some((nodeValue) => nodeValue) : undefined;

  return (
    <LogicalNode
      {...props}
      computeLogic={computeLogic}
      ViewComponent={OrView}
    />
  );
};

import { LogicalNode } from "../LogicalNode/LogicalNode";
import { AndView } from "./AndView";

export const And = (props) => {
  const computeLogic = (values) =>
    values.length > 0 ? values.every(Boolean) : undefined;

  return (
    <LogicalNode
      {...props}
      computeLogic={computeLogic}
      ViewComponent={AndView}
    />
  );
};

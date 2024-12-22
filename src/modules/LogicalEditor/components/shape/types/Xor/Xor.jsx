import { LogicalNode } from "../LogicalNode/LogicalNode";
import { XorView } from "./XorView";

export const Xor = (props) => {
  const computeLogic = (values) =>
    values.length > 0
      ? values.reduce((xorResult, nodeValue) => xorResult ^ nodeValue, 0) === 1
      : undefined;

  return (
    <LogicalNode
      {...props}
      computeLogic={computeLogic}
      ViewComponent={XorView}
    />
  );
};

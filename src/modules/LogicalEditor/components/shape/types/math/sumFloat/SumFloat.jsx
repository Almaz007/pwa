import { OperationComponent } from "../Operation/OperationComponent";
import { SumFloatView } from "./SumFloatView";

export const SumFloat = (props) => {
  return <OperationComponent {...props} ViewComponent={SumFloatView} />;
};

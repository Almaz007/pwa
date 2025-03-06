import { OperationComponent } from "../Operation/OperationComponent";
import { LessFloatView } from "./LessFloatView";

export const LessFloat = (props) => {
  return <OperationComponent {...props} ViewComponent={LessFloatView} />;
};

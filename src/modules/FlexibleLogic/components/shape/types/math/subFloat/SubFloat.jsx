import { OperationComponent } from "../Operation/OperationComponent";
import { SubFloatView } from "./SubFloatView";

export const SubFloat = (props) => {
  return <OperationComponent {...props} ViewComponent={SubFloatView} />;
};

import { OperationComponent } from "../Operation/OperationComponent";
import { MoreFloatView } from "./MoreFloatView";

export const MoreFloat = (props) => {
  return <OperationComponent {...props} ViewComponent={MoreFloatView} />;
};

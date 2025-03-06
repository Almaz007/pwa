import { OperationComponent } from "../Operation/OperationComponent";
import { MultFloatView } from "./MultFloatView";

export const MultFloat = (props) => {
  return <OperationComponent {...props} ViewComponent={MultFloatView} />;
};

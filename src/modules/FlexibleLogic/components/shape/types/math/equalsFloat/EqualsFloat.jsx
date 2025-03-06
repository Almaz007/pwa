import { OperationComponent } from "../Operation/OperationComponent";
import { EqualsFloatView } from "./EqualsFloattView";

export const EqualsFloat = (props) => {
  return <OperationComponent {...props} ViewComponent={EqualsFloatView} />;
};

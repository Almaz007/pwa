import { OperationComponent } from "../Operation/OperationComponent";
import { EqualsIntView } from "./EqualsIntView";

export const EqualsInt = (props) => {
  return <OperationComponent {...props} ViewComponent={EqualsIntView} />;
};

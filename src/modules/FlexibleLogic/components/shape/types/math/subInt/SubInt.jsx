import { OperationComponent } from "../Operation/OperationComponent";
import { SubIntView } from "./SubIntView";

export const SubInt = (props) => {
  return <OperationComponent {...props} ViewComponent={SubIntView} />;
};

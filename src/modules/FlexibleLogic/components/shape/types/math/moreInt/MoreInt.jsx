import { OperationComponent } from "../Operation/OperationComponent";
import { MoreIntView } from "./MoreIntView";

export const MoreInt = (props) => {
  return <OperationComponent {...props} ViewComponent={MoreIntView} />;
};

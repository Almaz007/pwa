import { OperationComponent } from "../Operation/OperationComponent";
import { LessIntView } from "./LessIntView";

export const LessInt = (props) => {
  return <OperationComponent {...props} ViewComponent={LessIntView} />;
};

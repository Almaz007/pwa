import { OperationComponent } from "../Operation/OperationComponent";
import { MultIntView } from "./MultIntView";

export const MultInt = (props) => {
  return <OperationComponent {...props} ViewComponent={MultIntView} />;
};

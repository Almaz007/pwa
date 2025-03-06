import { OperationComponent } from "../Operation/OperationComponent";
import { SumIntView } from "./SumIntView";

export const SumInt = (props) => {
  return <OperationComponent {...props} ViewComponent={SumIntView} />;
};

import { Output } from "../output/Output";
import { OutputBoolView } from "./OutputBoolView";

export const OutputBool = (props) => {
  return <Output {...props} ViewComponent={OutputBoolView} />;
};

import { Output } from "../output/Output";
import { OutputFloatView } from "./OutputFloatView";

export const OutputFloat = (props) => {
  return <Output {...props} ViewComponent={OutputFloatView} />;
};

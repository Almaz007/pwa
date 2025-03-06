import { Output } from "../output/Output";
import { OutputIntView } from "./OutputIntView";

export const OutputInt = (props) => {
  return <Output {...props} ViewComponent={OutputIntView} />;
};

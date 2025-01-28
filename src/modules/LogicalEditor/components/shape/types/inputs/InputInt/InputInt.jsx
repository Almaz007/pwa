import { Input } from "../Input/Input";
import { InputIntView } from "./InputIntView";

export const InputInt = (props) => {
  return <Input {...props} ViewComponent={InputIntView} />;
};

import { Input } from "../Input/Input";
import { InputBoolView } from "./InputBoolView";

export const InputBool = (props) => {
  return <Input {...props} ViewComponent={InputBoolView} />;
};

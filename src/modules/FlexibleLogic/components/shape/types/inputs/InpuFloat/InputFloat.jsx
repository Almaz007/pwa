import { Input } from "../Input/Input";
import { InputFloatView } from "./InputFloatView";

export const InputFloat = (props) => {
  return <Input {...props} ViewComponent={InputFloatView} />;
};

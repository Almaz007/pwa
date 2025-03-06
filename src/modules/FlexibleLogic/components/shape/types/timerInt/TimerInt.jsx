import { GeneralNode } from "../GeneralNode/GenerallNode";
import { TimerIntView } from "./TimerIntView";

export const TimerInt = (props) => {
  return (
    <GeneralNode
      {...props}
      computeLogic={() => {}}
      ViewComponent={TimerIntView}
    />
  );
};

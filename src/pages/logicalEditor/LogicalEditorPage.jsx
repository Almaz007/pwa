import { shallow } from "zustand/shallow";
import { LogicalEditorLayout } from "../../modules/LogicalEditor";
import { useBleState } from "../../modules/Terminal";

export const LogicalEditorPage = () => {
  const { currentDeviceId } = useBleState(
    (store) => ({ currentDeviceId: store.currentDeviceId }),
    shallow
  );
  return currentDeviceId ? (
    <LogicalEditorLayout />
  ) : (
    <h2>подключитесь к ble устройству</h2>
  );
};

import { shallow } from "zustand/shallow";
import { FlexibleLogicProvider } from "../../modules/FlexibleLogic";
import { useBleState } from "../../modules/Terminal";

const FlexibleLogicPage = () => {
  const { currentDeviceId } = useBleState(
    (store) => ({ currentDeviceId: store.currentDeviceId }),
    shallow
  );
  return currentDeviceId ? (
    <FlexibleLogicProvider />
  ) : (
    <h2 className={styles["test__page__title"]}>
      подключитесь к ble устройству
    </h2>
  );
};

export default FlexibleLogicPage;

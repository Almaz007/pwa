import { useBleState } from "../../modules/Terminal";
import { Test } from "../../modules/Test";
import styles from "./TestPage.module.css";
import { shallow } from "zustand/shallow";

export const TestPage = () => {
  const { currentDeviceId } = useBleState(
    (store) => ({ device: store.currentDeviceId }),
    shallow
  );
  return (
    <div className={styles["test__page"]}>
      {currentDeviceId ? (
        <Test />
      ) : (
        <h2 className={styles["test__page__title"]}>
          подключитесь к ble устройству
        </h2>
      )}
    </div>
  );
};

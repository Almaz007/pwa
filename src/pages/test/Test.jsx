import { useBleState } from "../../modules/Terminal";
import { Test } from "../../modules/Test";
import styles from "./TestPage.module.css";
import { shallow } from "zustand/shallow";

export const TestPage = () => {
  const { device } = useBleState(
    (store) => ({ device: store.device }),
    shallow
  );
  return (
    <div className={styles["test__page"]}>
      {true ? (
        <Test />
      ) : (
        <h2 className={styles["test__page__title"]}>
          подключитесь к ble устройству
        </h2>
      )}
    </div>
  );
};

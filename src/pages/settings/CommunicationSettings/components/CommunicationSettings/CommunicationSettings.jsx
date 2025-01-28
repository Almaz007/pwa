import styles from "./communicationSettings.module.css";
import cn from "classnames";
import { useState } from "react";

import MekSettings from "../MekSettings/MekSettings";
import MekSettings103 from "../MekSettings103/MekSettings103";
import NotificationDutyOfficer from "../NotificationDutyOfficer/NotificationDutyOfficer";
import BluetoothSettigns from "../BluetoothSettings/BluetoothSettings";
import GsmModuleSettings from "../GsmModuleSettings/GsmModuleSettings";

const CommunicationSettings = () => {
  const [index, setIndex] = useState("0");
  const [csIndex, setCsIndex] = useState("0");

  const clientServer = {
    0: " (для клиент)",
    1: " (для сервер)",
  };

  const elements = {
    0: { text: "Настройки bluetooth", element: <BluetoothSettigns /> },
    1: {
      text: "Настройка GSM модуля",
      element: <GsmModuleSettings />,
    },

    2: {
      text: "Настройка МЭК 60870-5-103",
      element: <MekSettings103 setCsIndex={setCsIndex} />,
    },
    3: {
      text: "Настройка МЭК 60870-5-104",
      element: <MekSettings />,
    },
    4: { text: "Оповещение дежурному", element: <NotificationDutyOfficer /> },
  };

  return (
    <div>
      <div className={styles["choise__block"]}>
        {Object.entries(elements).map((item) => (
          <div
            key={item[0]}
            className={cn(styles["table__item"], {
              [styles["active"]]: item[0] === index,
            })}
            onClick={() => setIndex(item[0])}
          >
            {item[1].text}
          </div>
        ))}
      </div>
      <div className={styles["table_block"]}>
        <h2 className={styles["table__title"]}>
          {elements[index].text + (index === "2" ? clientServer[csIndex] : "")}
        </h2>
        {elements[index].element}
      </div>
    </div>
  );
};

export default CommunicationSettings;

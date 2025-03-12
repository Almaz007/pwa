import styles from "./terminal.module.css";
import LogItem from "../logItem/LogItem";
import SendForm from "../sendForm/SendForm";
import {
  MdOutlineBluetoothConnected,
  MdOutlineBluetoothDisabled,
} from "react-icons/md";
import { AiOutlineClear } from "react-icons/ai";
import cn from "classnames";
import { useTermianl } from "../../hooks/useTerminal";
import { connectionTypes } from "../../constants/constatns";
import { CustomSelect } from "../../../../components/UI/CustomSelect/CustomSelect";
import { SelectRow } from "../../../../components/UI/SelectRow/SelectRow";
import { useBleState } from "../../store/store";
import { useState } from "react";

export const Terminal = () => {
  const [text, setText] = useState("");
  const [devices, connect, disconnect, logs, clearLogs, send, currentDeviceId] =
    useBleState((state) => [
      state.devices,
      state.connect,
      state.disconnect,
      state.logs,
      state.clearLogs,
      state.send,
      state.currentDeviceId,
      state.changeDeviceById,
    ]);

  const handleClick = () => {
    setText("");
    send(text);
  };
  const deviceClick = (id) => {
    if (currentDeviceId === id) return;
    changeDeviceById(id);
  };
  return (
    <div className={styles["terminal"]}>
      <div className={styles["logs__block"]}>
        <div className={styles["btns"]}>
          <div className={styles["btn__block"]} data-title="Очистка">
            <AiOutlineClear
              onClick={clearLogs}
              className={cn(styles["button"], styles["clear"])}
            />
          </div>
          <div className={styles["btn__block"]} data-title="Подключение">
            <MdOutlineBluetoothConnected
              onClick={() => connect()}
              className={cn(styles["button"], styles["connect"])}
              data-title="Подключение"
            />
          </div>
          <div className={styles["btn__block"]} data-title="Отключение">
            <MdOutlineBluetoothDisabled
              onClick={() => disconnect()}
              className={cn(styles["button"], styles["disconnect"])}
              data-title="Отключение"
            />
          </div>
          {/* <CustomSelect
            values={[...connectionTypes]}
            value={connectionType}
            handleChange={(event) => setConnectionType(event.target.value)}
            label="тип соединения"
          /> */}
        </div>
        <SelectRow title={"Подключенные устройства"}>
          {Object.keys(devices).length ? (
            Object.values(devices).map(({ device }) => {
              return (
                <div
                  key={device.id}
                  className={cn(styles["device"], {
                    [styles["selected"]]: device.id === currentDeviceId,
                  })}
                  onClick={() => deviceClick(device.id)}
                >
                  <div className={cn(styles["name"])}>{device.name}</div>
                  {/* <button className={styles["disconnect__btn"]}>
                    отключить
                  </button> */}
                </div>
              );
            })
          ) : (
            <p>Нету выбранных устройств</p>
          )}
        </SelectRow>

        <div className={styles["logs"]}>
          {logs.map((log) => (
            <LogItem key={log.id} log={log} />
          ))}
        </div>
      </div>

      <SendForm handleClick={handleClick} text={text} setText={setText} />
    </div>
  );
};

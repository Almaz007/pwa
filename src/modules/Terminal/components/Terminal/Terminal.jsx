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

export const Terminal = () => {
  const {
    connectionType,
    setConnectionType,
    text,
    setText,
    logs,
    clearLogs,
    send,
    connect,
    disconnect,
  } = useTermianl();

  const handleClick = () => {
    setText("");
    send(text);
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
          <CustomSelect
            values={[...connectionTypes]}
            value={connectionType}
            handleChange={(event) => setConnectionType(event.target.value)}
            label="тип соединения"
          />
        </div>
        <SelectRow title={"Подключенные устройства"}>
          <ul>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
          </ul>
        </SelectRow>
        <SelectRow title={"Новые устройства"}>
          <ul>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
            <li>test</li>
          </ul>
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

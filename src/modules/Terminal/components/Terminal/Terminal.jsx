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
          <AiOutlineClear
            onClick={clearLogs}
            className={cn(styles["button"], styles["clear"])}
          />
          <MdOutlineBluetoothConnected
            onClick={() => connect()}
            className={cn(styles["button"], styles["connect"])}
          />
          <MdOutlineBluetoothDisabled
            onClick={() => disconnect()}
            className={cn(styles["button"], styles["disconnect"])}
          />
          <CustomSelect
            values={[...connectionTypes]}
            value={connectionType}
            handleChange={(event) => setConnectionType(event.target.value)}
            label="тип соединения"
          />
        </div>
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

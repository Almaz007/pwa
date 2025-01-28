import styles from "./terminal.module.css";
import LogItem from "../logItem/LogItem";
import SendForm from "../sendForm/SendForm";

import { useBluetoothState } from "../../store/store";
import {
  MdOutlineBluetoothConnected,
  MdOutlineBluetoothDisabled,
} from "react-icons/md";
import { AiOutlineClear } from "react-icons/ai";
import cn from "classnames";
import { useState } from "react";

export const BleTerminal = () => {
  const [connect, disconnect, logs] = useBluetoothState((state) => [
    state.connect,
    state.disconnect,
    state.logs,
  ]);
  const [text, setText] = useState("");
  const handleClick = () => {};
  return (
    <div className={styles["terminal"]}>
      <div className={styles["logs__block"]}>
        <div className={styles["btns"]}>
          <AiOutlineClear
            onClick={() => console.log("clear")}
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
        </div>
        <div className={styles["logs"]}>
          {logs.map((log) => (
            <LogItem key={log.id} log={log} setText={setText} />
          ))}
        </div>
      </div>

      <SendForm handleClick={handleClick} text={text} />
    </div>
  );
};

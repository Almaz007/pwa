import { useBleState } from "../../../Terminal";
import { IoBulbSharp } from "react-icons/io5";
import styles from "./Test.module.css";
import { useEffect, useMemo } from "react";
import cn from "classnames";
import { shallow } from "zustand/shallow";
import { PiFan } from "react-icons/pi";
import { LuBatteryCharging } from "react-icons/lu";
import { PiFanFill } from "react-icons/pi";

export const Test = () => {
  const [send, options, setOptions, batteryValue, timerValue] = useBleState(
    (state) => [
      state.send,
      state.options,
      state.setOptions,
      state.batteryValue,
      state.timerValue,
    ],
    shallow
  );

  useEffect(() => {
    const message = Object.entries(options)
      .reduce((acc, option) => {
        acc.push(option[1].state);

        return acc;
      }, [])
      .join("");
    send(message);
  }, [options]);

  return (
    <>
      <div className={styles["time"]}>
        <div className="timer__value">time: {timerValue}</div>
      </div>
      <div className={styles["battery"]}>
        <LuBatteryCharging className={styles["battery__icon"]} />
        <div className="battery__value">{batteryValue} mV</div>
      </div>
      <div className={styles["bulb__row"]}>
        {Object.entries(options)
          .slice(0, -1)
          .map((option) => (
            <div key={option[0]} className={styles["bulb__item"]}>
              <IoBulbSharp
                className={cn(styles["bulb"], styles[option[1].color], {
                  [styles["active"]]: !!option[1].state,
                })}
                onClick={() => setOptions(option[0])}
              />
              <div className={styles["text"]}>{option[1].color}</div>
            </div>
          ))}
      </div>
      <div className={styles["blinker"]}>
        <PiFanFill
          className={cn(styles["blinker__icon"], {
            [styles["active"]]: !!options[4].state,
          })}
          onClick={() => setOptions(4)}
        />

        <div className={styles["text"]}>{"blinker"}</div>
      </div>
    </>
  );
};

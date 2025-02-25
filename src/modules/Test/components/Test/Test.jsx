import { useBleState } from "../../../Terminal";
import { IoBulbSharp } from "react-icons/io5";
import styles from "./Test.module.css";
import { useEffect, useMemo } from "react";
import cn from "classnames";
import { shallow } from "zustand/shallow";

export const Test = () => {
  const [send, selectedBulbs, setSelectedBulbs, bulbs] = useBleState(
    (state) => [
      state.send,
      state.selectedBulbs,
      state.setSelectedBulbs,
      state.bulbs,
    ],
    shallow
  );

  useEffect(() => {
    console.log(selectedBulbs.join(" "));
    if (selectedBulbs.length) {
      send(selectedBulbs.join(" "));
    } else {
      send("0");
    }
  }, [selectedBulbs]);

  return (
    <div className={styles["test"]}>
      <div className={styles["bulb__row"]}>
        {bulbs.map((bulb) => (
          <div
            key={bulb.id}
            className={cn(styles["bulb"], {
              [styles[bulb.color]]: selectedBulbs.includes(bulb.id),
            })}
            onClick={() => setSelectedBulbs(bulb.id)}
          >
            <IoBulbSharp />
            <div className={styles["color"]}>{bulb.color}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

import styles from "./SelectRow.module.css";
import cn from "classnames";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export const SelectRow = ({ children, title }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow((prev) => !prev);
  };
  return (
    <div
      className={cn(styles["select__row"], {
        [styles["show"]]: show,
      })}
    >
      <div className={styles["info"]} onClick={handleClick}>
        <div className="title">{title}</div>
        <div className={styles["icon"]}>
          <MdKeyboardArrowDown />
        </div>
      </div>
      <div
        className={cn(styles["content"], {
          [styles["show"]]: show,
        })}
      >
        <div className={styles["content__block"]}>{children}</div>
      </div>
    </div>
  );
};

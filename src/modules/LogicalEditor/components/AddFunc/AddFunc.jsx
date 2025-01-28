import { useState } from "react";
import styles from "./AddFunc.module.css";
import cn from "classnames";
import { CiCirclePlus } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { Button } from "@mui/material";

export const AddFunc = ({ handleClick }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  const saveFunc = () => {
    if (!name.length) return;

    handleClick(name);
    setName("");
    setShow(false);
  };
  return (
    <div className={styles["add__func"]}>
      <button
        className={styles["add__btn"]}
        onClick={() => setShow((prev) => !prev)}
      >
        <CiCirclePlus />
      </button>
      <div>добавление функции</div>

      <div
        className={cn(styles["add__popup"], {
          [styles["show"]]: show,
        })}
      >
        <div className={styles["close"]}>
          <div
            className={styles["close__btn"]}
            onClick={() => setShow((prev) => !prev)}
          >
            <MdClose />
          </div>
        </div>
        <input
          className={styles["input"]}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className={styles["button_block"]}>
          <Button
            variant="contained"
            onClick={saveFunc}
            disabled={name.length === 0 ? true : false}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
};

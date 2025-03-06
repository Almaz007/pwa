import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styled from "@emotion/styled";

import cn from "classnames";
import styles from "./ElementsPanel.module.css";

import { Button } from "@mui/material";

const StyledButton = styled(Button)({
  fontSize: "18px",
  textTransform: "lowercase",
});

const ElementsPanel = ({ text, children }) => {
  const [visible, setVisible] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const handlelClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("click", handlelClickOutside);

    return () => {
      document.removeEventListener("click", handlelClickOutside);
    };
  }, []);

  return (
    <div className={styles["panel"]} ref={panelRef}>
      <StyledButton
        variant="contained"
        onClick={() => {
          setVisible((prev) => !prev);
        }}
        className={styles["btn"]}
      >
        <IoIosArrowDown
          className={cn(styles["btn__arrow"], { [styles["visible"]]: visible })}
        />
        {text}
      </StyledButton>
      <div
        className={cn(styles["elements__panel"], {
          [styles["visible"]]: visible,
        })}
      >
        <div className={styles["sidebar__label"]}>{text}</div>
        <div className={styles["panel__items"]}>{children}</div>
      </div>
    </div>
  );
};

export default ElementsPanel;

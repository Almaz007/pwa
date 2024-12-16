import { useState, useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styled from "@emotion/styled";
// import { Button } from "@mui/material";
import cn from "classnames";
import styles from "./ElementsPanel.module.css";
import { ShapeComponents } from "../shape/types";
import { PanelItem } from "../PanelItem/PanelItem";
import { Button } from "@mui/material";
// import Button from "../../../../components/UI/button/Button";
const StyledButton = styled(Button)({
  fontSize: "18px",
  textTransform: "lowercase",
});
const ElementsPanel = () => {
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

  console.log("visible: " + visible);
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
        Элементы
      </StyledButton>
      <div
        className={cn(styles["elements__panel"], {
          [styles["visible"]]: visible,
        })}
      >
        <div className={styles["sidebar__label"]}>Элементы</div>
        <div className={styles["panel__items"]}>
          {Object.keys(ShapeComponents).map((type) => (
            <PanelItem type={type} key={type} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElementsPanel;

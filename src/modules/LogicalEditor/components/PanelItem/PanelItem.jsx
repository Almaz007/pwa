import { ShapeComponents } from "../shape/types";
import { useRef } from "react";
import styles from "./PanelItem.module.css";
import { meassuredsNodesByType } from "../../constants/constants";

export const PanelItem = ({ type }) => {
  // console.log(type);
  const dragImageRef = useRef(null);
  const Item = ShapeComponents[type].view;
  const { width, height } = meassuredsNodesByType[type];

  const onDragStart = (event) => {
    event.dataTransfer?.setData("application/reactflow", type);

    if (dragImageRef.current) {
      event.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
    }
  };

  return (
    <div className={styles["panel__item"]} draggable onDragStart={onDragStart}>
      <Item width={width} height={height} disabled={true} />
      <div className={styles["sidebar-item-drag-image"]} ref={dragImageRef}>
        <Item width={width} height={height} disabled={true} />
      </div>
    </div>
  );
};

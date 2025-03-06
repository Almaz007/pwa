import React from "react";
import styles from "./Output.module.css";
export const OutputView = ({ width = 210, height = 25, children }) => {
  return (
    <div style={{ width, height }} className={styles["output"]}>
      {children}
    </div>
  );
};

import styles from "./OutputNode.module.css";

export const OutputNodeView = ({ width, height }) => {
  return (
    <div style={{ width, height }} className={styles["output"]}>
      <p>out</p>
    </div>
  );
};

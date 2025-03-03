import { Ustavki } from "../../modules/Ustavki";
import styles from "./UstavkiPage.module.css";

export const UstavkiPage = () => {
  return (
    <div>
      <h2 className={styles["title"]}>Уставки</h2>
      <Ustavki />
    </div>
  );
};

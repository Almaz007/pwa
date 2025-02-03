import styles from "./LogicalEditorLayout.module.css";
import { Outlet } from "react-router-dom";
import SetpointMenu from "../SetpointMenu/SetpointMenu";
import { SnackbarProvider } from "notistack";

const LogicalEditorLayout = () => {
  return (
    <div className={styles["layout"]}>
      <SnackbarProvider />
      <div className={styles["configuraton"]}>
        <SetpointMenu />
      </div>

      <Outlet />
    </div>
  );
};

export default LogicalEditorLayout;

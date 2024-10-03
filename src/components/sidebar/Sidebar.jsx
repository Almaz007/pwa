import { useState } from "react";
import styles from "./sidebar.module.css";
import cn from "classnames";
import { NavLink } from "react-router-dom";
import { FaTerminal } from "react-icons/fa6";
import { FaChartLine } from "react-icons/fa6";

const Sidebar = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    return (
        <div
            className={cn(styles["sidebar"], {
                [styles["visible"]]: sidebarVisible,
            })}
        >
            <div
                className={styles["overlay"]}
                onClick={() => setSidebarVisible(false)}
            ></div>
            <div className={styles["menu"]}>
                <div
                    onClick={() => setSidebarVisible((prev) => !prev)}
                    className={styles["toogle"]}
                >
                    {">"}
                </div>

                <nav className={styles["nav"]}>
                    <ul className={styles["nav__column"]}>
                        <li>
                            <NavLink
                                onClick={() => setSidebarVisible(false)}
                                className={({ isActive }) =>
                                    isActive
                                        ? cn(styles["link"], {
                                              [styles["active"]]: isActive,
                                          })
                                        : styles["link"]
                                }
                                to={"/"}
                            >
                                <div className={styles["icon"]}>
                                    <FaTerminal />
                                </div>
                                <div className={styles["text"]}>Терминал</div>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={() => setSidebarVisible(false)}
                                className={({ isActive }) =>
                                    isActive
                                        ? cn(styles["link"], {
                                              [styles["active"]]: isActive,
                                          })
                                        : styles["link"]
                                }
                                to={"oscilogramms"}
                            >
                                <div className={styles["icon"]}>
                                    <FaChartLine />
                                </div>
                                <div className={styles["text"]}>
                                    Осцилограммы
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;

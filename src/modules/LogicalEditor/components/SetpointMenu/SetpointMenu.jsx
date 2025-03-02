import styles from "./SetpointMenu.module.css";
import cn from "classnames";
import BurgerBtn from "../../../../components/UI/BurgerBtn/BurgerBtn";
import { useState, useEffect, useRef, useMemo } from "react";
import { setPointMenuSelector } from "../../store/selectors";
import { useLogicalEditorState } from "../../store/store";
import { shallow } from "zustand/shallow";
import { generateNode } from "../../helpers/helpers";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AddFunc } from "../AddFunc/AddFunc";
import { nanoid } from "nanoid";

const FuncButton = styled(Button)({
  fontSize: 16,
  textTransform: "lowercase",
});

const SetpointMenu = () => {
  const [visible, setVisible] = useState(false);
  const menuRef = useRef(null);
  const store = useLogicalEditorState(setPointMenuSelector, shallow);
  const navigate = useNavigate();

  useEffect(() => {
    const handlelClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setVisible(false);
      }
    };
    document.addEventListener("click", handlelClickOutside);

    return () => {
      document.removeEventListener("click", handlelClickOutside);
    };
  }, []);

  const handleClick = (name) => {
    const id = nanoid();
    const node = {
      id: id,
      type: "groupNode",
      position: {
        x: 0,
        y: 0,
      },
      data: {
        name: name,
      },
      style: {
        width: 600,
        height: 400,
      },
    };
    store.addNode(node);
  };

  const funcs = useMemo(() => {
    return store.nodes
      .filter((node) => node.type === "groupNode")
      .sort((func1, func2) => {
        return func1.data.name > func2.data.name ? 1 : -1;
      });
  }, [store.nodes]);

  const handleVisibleFunc = (event, groupId) => {
    const nextNodes = store.nodes.map((node) => {
      return node.id === groupId || node.parentId === groupId
        ? { ...node, hidden: !event.target.checked }
        : node;
    });
    console.log(nextNodes);
    store.setNodes(nextNodes);
  };
  const handleDoubleClick = (id) => {
    navigate(`functionEditingArea/${id}`);
  };

  return (
    <div ref={menuRef} className={styles["setpoint__menu"]}>
      <BurgerBtn visible={visible} setVisible={setVisible} />

      <div
        className={cn(styles["menu"], {
          [styles["visible"]]: visible,
        })}
      >
        <AddFunc handleClick={handleClick} />

        <div className={styles["func_column"]}>
          {funcs.map((func, index) => (
            <div key={func.id} className={styles["func"]}>
              <Checkbox
                defaultChecked
                onChange={(event) => handleVisibleFunc(event, func.id)}
              />

              <FuncButton
                variant="text"
                size="small"
                onDoubleClick={() => handleDoubleClick(func.id)}
                className={styles["func__btn"]}
              >
                {func.data.name}
              </FuncButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetpointMenu;

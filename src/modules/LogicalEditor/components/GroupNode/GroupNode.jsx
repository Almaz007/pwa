import {
  NodeResizer,
  useReactFlow,
  useStore,
  useStoreApi,
} from "@xyflow/react";
import styles from "./GroupNode.module.css";
import cn from "classnames";
import { getRelativeNodesBounds, isEqual } from "../../helpers/helpers";
import { memo } from "react";
import useDetachNodes from "../../hooks/useDetachNodes";
import CustomNodeToolbar from "../CustomNodeToolbar/CustomNodeToolbar";

const GroupNode = ({ id, data }) => {
  //   const [handlesValues, setHandlesValues] = useState({
  //     input: undefined,
  //     second: undefined,
  //   });

  const store = useStoreApi();
  const { deleteElements } = useReactFlow();
  const detachNodes = useDetachNodes();

  const { minWidth, minHeight, hasChildNodes } = useStore((state) => {
    const childNodes = Array.from(state.nodeLookup.values()).filter(
      (node) => node.parentId === id
    );

    const rect = getRelativeNodesBounds(childNodes);

    return {
      minWidth: rect.x + rect.width,
      minHeight: rect.y + rect.height,
      hasChildNodes: childNodes.length > 0,
    };
  }, isEqual);

  const onDetach = () => {
    const childNodeIds = Array.from(store.getState().nodeLookup.values())
      .filter((n) => n.parentId === id)
      .map((n) => n.id);

    detachNodes(childNodeIds, id);
  };

  const onDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };
  return (
    <div className={cn(styles["group"])}>
      <NodeResizer minWidth={minWidth} minHeight={minHeight} />
      <CustomNodeToolbar>
        <button onClick={onDelete}>delete</button>
        <button onClick={onDetach}>detach</button>
      </CustomNodeToolbar>
      {/* {Object.keys(handlesValues).map((key) => (
        <div className={styles["handle"]} key={key}>
          <CustomHandle
            id={key}
            position={Position.Left}
            handleData={(handleData) => {}}
            connectionsCount={1}
          />
        </div>
      ))} */}
    </div>
  );
};

export default memo(GroupNode);

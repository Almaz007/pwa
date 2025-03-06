import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,
  ConnectionLineType,
} from "@xyflow/react";
import { useState } from "react";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}) {
  const { setEdges } = useReactFlow();
  const [label, setLabel] = useState("testr");
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  const onInputChange = (event) => {
    const newLabel = event.target.value;
    setLabel(newLabel);

    setEdges((edges) =>
      edges.map((edge) =>
        edge.id === id
          ? { ...edge, data: { ...edge.data, label: newLabel } }
          : edge
      )
    );
  };

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ pointerEvents: "all" }}
        // type={ConnectionLineType.SmoothStep}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            zIndex: "1000",
            width: "max-content",
            backgroundColor: "#fff",
            border: "1px solid #777777",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all", // Включаем обработку событий мыши
          }}
        >
          <input
            type="text"
            value={data.label}
            onChange={onInputChange}
            style={{
              width: "70px",
              textAlign: "center",

              fontSize: "12px",
              padding: "4px",
            }}
            className="nodrag nopan" // Отключаем перетаскивание и панорамирование
          />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

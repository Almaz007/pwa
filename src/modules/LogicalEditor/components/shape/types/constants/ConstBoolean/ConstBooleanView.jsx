import { GeneralNodeView } from "../../GeneralNodeView/GeneralNodeView";

export const ConstBooleanView = ({ width, height }) => {
  return (
    <GeneralNodeView width={width} height={height}>
      <text
        x={0.5 + 83.6 - 15} // Отступ 15px от правого края
        y={20} // Фиксированное положение по оси Y
        style={{
          fontSize: "10px",
          fontWeight: "400",
          strokeWidth: "0.8px",
          textAnchor: "end", // Выравнивание по правому краю
        }}
      >
        Const bool
      </text>
    </GeneralNodeView>
  );
};

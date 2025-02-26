import { GeneralNodeView } from "../../GeneralNodeView/GeneralNodeView";

export const ConstIntView = ({ width, height }) => {
  return (
    <GeneralNodeView width={width} height={height}>
      <text
        x="58"
        y="20"
        style={{
          fontSize: "10px",
          fontWeight: "400",
          strokeWidth: "0.8px",
        }}
      >
        Const int
      </text>
    </GeneralNodeView>
  );
};

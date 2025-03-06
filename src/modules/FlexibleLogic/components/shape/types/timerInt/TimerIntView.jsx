import { GeneralNodeView } from "../GeneralNodeView/GeneralNodeView";

export const TimerIntView = ({ width, height }) => {
  return (
    <GeneralNodeView width={width} height={height} dataType="Int">
      <text
        x="58"
        y="20"
        style={{
          fontSize: "10px",
          fontWeight: "400",
          strokeWidth: "0.8px",
        }}
      >
        TM
      </text>
    </GeneralNodeView>
  );
};

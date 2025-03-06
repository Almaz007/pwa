import { LogicalNodeView } from "../LogicalNodeView/LogicalNodeView";

export const XorView = ({ width, height }) => {
  return (
    <LogicalNodeView width={width} height={height}>
      <line y1="31" x2="28.2014" y2="31" />

      <line y1="94" x2="28.2014" y2="94" />
      <text
        x="88"
        y="20"
        style={{
          fontSize: "10px",
          fontWeight: "400",
          strokeWidth: "0.8px",
        }}
      >
        XOR
      </text>
    </LogicalNodeView>
  );
};

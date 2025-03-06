import { LogicalNodeView } from "../LogicalNodeView/LogicalNodeView";

export const AndView = ({ width, height }) => (
  <LogicalNodeView width={width} height={height}>
    <line y1="21" x2="28.2" y2="21" />
    <line y1="62" x2="28.2" y2="62" />
    <line y1="104" x2="28.2" y2="104" />
    <text x="100" y="20" style={{ fontSize: "14px", fontWeight: "400" }}>
      &
    </text>
  </LogicalNodeView>
);

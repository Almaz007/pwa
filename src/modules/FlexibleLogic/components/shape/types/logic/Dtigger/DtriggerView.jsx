import { LogicalNodeView } from "../LogicalNodeView/LogicalNodeView";

export const DtriggerView = ({ width, height }) => {
  return (
    <LogicalNodeView width={width} height={height}>
      <line y1="63" x2="28.2" y2="63" />
      <line x1="71.5" y1="1" x2="71.5" y2="125" stroke="black" />
      <path
        d="M36.7841 67H33.9588V58.2727H36.8736C37.7287 58.2727 38.4631 58.4474 39.0767 58.7969C39.6903 59.1435 40.1605 59.642 40.4872 60.2926C40.8168 60.9403 40.9815 61.7173 40.9815 62.6236C40.9815 63.5327 40.8153 64.3139 40.483 64.9673C40.1534 65.6207 39.6761 66.1236 39.0511 66.4759C38.4261 66.8253 37.6705 67 36.7841 67ZM35.2756 65.8494H36.7116C37.3764 65.8494 37.929 65.7244 38.3693 65.4744C38.8097 65.2216 39.1392 64.8565 39.358 64.3793C39.5767 63.8991 39.6861 63.3139 39.6861 62.6236C39.6861 61.9389 39.5767 61.358 39.358 60.8807C39.142 60.4034 38.8196 60.0412 38.3906 59.794C37.9616 59.5469 37.429 59.4233 36.7926 59.4233H35.2756V65.8494Z"
        fill="black"
      />
      <path
        d="M76.5284 7.40625V6.27273H83.2827V7.40625H80.5597V15H79.2472V7.40625H76.5284Z"
        fill="black"
      />
    </LogicalNodeView>
  );
};

import { OperationView } from "../Operation/OperationView";

export const MultFloatView = ({ width, height }) => {
  return (
    <OperationView
      width={width}
      height={height}
      dataType={"Float"}
      text={"MultFloat"}
    />
  );
};

import { OperationView } from "../Operation/OperationView";

export const EqualsFloatView = ({ width, height }) => {
  return (
    <OperationView
      width={width}
      height={height}
      dataType={"Float"}
      text={"="}
    />
  );
};

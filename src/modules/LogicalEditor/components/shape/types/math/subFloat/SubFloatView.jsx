import { OperationView } from "../Operation/OperationView";
export const SubFloatView = ({ width, height }) => {
  return (
    <OperationView
      width={width}
      height={height}
      dataType={"Float"}
      text={"SubFloat"}
    />
  );
};

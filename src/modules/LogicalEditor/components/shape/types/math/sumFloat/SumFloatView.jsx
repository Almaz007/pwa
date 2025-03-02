import { OperationView } from "../Operation/OperationView";

export const SumFloatView = ({ width, height }) => {
  return (
    <OperationView
      width={width}
      height={height}
      dataType={"Float"}
      text={"SumInt"}
    />
  );
};

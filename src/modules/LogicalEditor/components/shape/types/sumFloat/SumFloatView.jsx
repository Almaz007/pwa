import { OperationView } from "../operationView/OperationView";

export const SumFloatView = ({ width, height }) => {
  return (
    <OperationView
      width={width}
      height={height}
      dataType={"float"}
      operationType={"sum"}
    />
  );
};

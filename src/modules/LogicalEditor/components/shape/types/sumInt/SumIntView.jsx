import { OperationView } from "../operationView/OperationView";
export const SumIntView = ({ width, height }) => {
  return (
    <OperationView
      width={width}
      height={height}
      dataType={"number"}
      operationType={"sum"}
    />
  );
};

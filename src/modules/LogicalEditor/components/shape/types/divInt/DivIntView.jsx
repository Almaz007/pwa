import { OperationView } from "../operationView/OperationView";
export const DivIntView = ({ width, height }) => {
  return (
    <OperationView
      width={width}
      height={height}
      dataType={"number"}
      operationType={"div"}
    />
  );
};

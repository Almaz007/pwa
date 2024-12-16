import { OperationView } from "../operationView/OperationView";
export const DivFLoatView = ({ width, height }) => {
  return (
    <OperationView
      width={width}
      height={height}
      dataType={"float"}
      operationType={"div"}
    />
  );
};

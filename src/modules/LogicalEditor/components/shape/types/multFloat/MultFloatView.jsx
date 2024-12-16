import { OperationView } from "../operationView/OperationView";
export const MultFloatView = ({ width, height }) => {
  return (
    <OperationView
      width={width}
      height={height}
      dataType={"float"}
      operationType={"mult"}
    />
  );
};

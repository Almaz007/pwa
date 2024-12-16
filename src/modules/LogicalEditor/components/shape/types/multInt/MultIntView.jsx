import { OperationView } from "../operationView/OperationView";
export const MultIntView = ({ width, height }) => {
  return (
    <OperationView
      width={width}
      height={height}
      dataType={"number"}
      operationType={"mult"}
    />
  );
};

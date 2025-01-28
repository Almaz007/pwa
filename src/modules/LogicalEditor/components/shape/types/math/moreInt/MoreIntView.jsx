import { OperationView } from "../Operation/OperationView";

export const MoreIntView = ({ width, height }) => {
  return (
    <OperationView width={width} height={height} dataType={"Int"} text={">"} />
  );
};

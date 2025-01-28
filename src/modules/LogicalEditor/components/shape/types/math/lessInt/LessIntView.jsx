import { OperationView } from "../Operation/OperationView";

export const LessIntView = ({ width, height }) => {
  return (
    <OperationView width={width} height={height} dataType={"Int"} text={"<"} />
  );
};

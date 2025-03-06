import { OperationView } from "../Operation/OperationView";

export const SumIntView = ({ width, height }) => {
  return (
    <OperationView
      width={width}
      height={height}
      dataType={"Int"}
      text={"SumInt"}
    />
  );
};

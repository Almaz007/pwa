import { OperationView } from "../Operation/OperationView";

export const SubIntView = ({ width, height }) => {
  return (
    <OperationView
      width={width}
      height={height}
      dataType={"Int"}
      text={"SubInt"}
    />
  );
};

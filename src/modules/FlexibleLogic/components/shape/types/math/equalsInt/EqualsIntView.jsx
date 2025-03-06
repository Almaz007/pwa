import { OperationView } from "../Operation/OperationView";

export const EqualsIntView = ({ width, height }) => {
  return (
    <OperationView
      width={width}
      height={height}
      dataType={"Int"}
      text={"="}
      end="bool"
    />
  );
};

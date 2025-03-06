import { OperationView } from "../Operation/OperationView";

export const MultIntView = ({ width, height }) => {
  return (
    <OperationView
      width={width}
      height={height}
      dataType={"Int"}
      text={"MultInt"}
    />
  );
};

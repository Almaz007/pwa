import { OperationView } from "../Operation/OperationView";

export const MoreFloatView = ({ width, height }) => {
  return (
    <OperationView
      width={width}
      height={height}
      dataType={"Float"}
      text={">"}
    />
  );
};

import { OperationView } from "../Operation/OperationView";

export const LessFloatView = ({ width, height }) => {
  return (
    <OperationView
      width={width}
      height={height}
      dataType={"Float"}
      text={"<"}
    />
  );
};

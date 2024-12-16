import { OperationView } from "../operationView/OperationView";
import { Sum } from "../Sum/Sum";

export const SumInt = ({ id, width, height, data, children }) => {
  const { dataType, operationType } = data;

  return (
    <Sum id={id} width={width} height={height} data={data}>
      <OperationView
        width={width}
        height={height}
        dataType={dataType}
        operationType={operationType}
      />
    </Sum>
  );
};

import { Mult } from "../Mult/Mult";
import { OperationView } from "../operationView/OperationView";

export const MultFloat = ({ id, width, height, data, children }) => {
  const { dataType, operationType } = data;

  return (
    <Mult id={id} width={width} height={height} data={data}>
      <OperationView
        width={width}
        height={height}
        dataType={dataType}
        operationType={operationType}
      />
    </Mult>
  );
};

import { InputView } from "../Input/InputView";

export const InputBoolView = ({ width, height }) => {
  return (
    <InputView width={width} height={height} dataType={"bool"}>
      <text x="11" y="16" fontFamily="Arial" fontSize="12" fill="black">
        xxxxxx
      </text>
      {/* Полукруг */}
      <path
        d="M60,0.5
           A12,12 0 0 1 60,24.5"
        stroke="black"
        fill="none"
      />
    </InputView>
  );
};

import { InputView } from "../Input/InputView";

export const InputIntView = ({ width, height }) => {
  return (
    <InputView width={width} height={height}>
      <text x="11" y="16" fontFamily="Arial" fontSize="12" fill="black">
        1xxxxx
      </text>
      <path d="M73 1V25" stroke="black" />

      <polygon
        points="201,13 205,9 209,13 205,17"
        stroke="black"
        fill="black"
      />
    </InputView>
  );
};

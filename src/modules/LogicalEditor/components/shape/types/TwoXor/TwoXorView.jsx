export const TwoXorView = ({
  width,
  height,
  fill = "#fff",
  stroke = "#000",
  strokeWidth = 1,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 140 125"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="28.7014"
        y="0.5"
        width="83.6043"
        height="124"
        fill="white"
        stroke="black"
      />
      <line y1="31" x2="28.2014" y2="31" />

      <line y1="94" x2="28.2014" y2="94" />
      <text
        x="88"
        y="20"
        style={{
          fontSize: "10px",
          fontWeight: "400",
          strokeWidth: "0.8px",
        }}
      >
        XOR
      </text>
      <line x1="111.799" y1="63" x2="140" y2="63" />
    </svg>
  );
};

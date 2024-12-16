export const TwoOrView = ({
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
      <line y1="21" x2="28.2014" y2="21" />
      <line y1="62" x2="28.2014" y2="62" />
      <line y1="104" x2="28.2014" y2="104" />
      <text
        x="100"
        y="20"
        style={{
          fontSize: "14px",
          fontWeight: "400",
        }}
      >
        1
      </text>
      <line x1="111.799" y1="63" x2="140" y2="63" />
    </svg>
  );
};

export const LogicalNodeView = ({ width, height, children }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 140 125"
    fill="#fff"
    stroke="#000"
    strokeWidth={1}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="28.7"
      y="0.5"
      width="83.6"
      height="124"
      fill="white"
      stroke="black"
    />
    <line x1="111.8" y1="63" x2="140" y2="63" />
    {children}
  </svg>
);

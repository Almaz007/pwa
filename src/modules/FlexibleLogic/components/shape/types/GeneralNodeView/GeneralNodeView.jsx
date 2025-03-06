const dots = {
  Int: {
    third: <polygon points="104,63 108,59 112,63 108,67" fill="black" />,
  },
  Float: {
    third: <polygon points="108,58 112,68 108,63" fill="black" />,
  },
};

export const GeneralNodeView = ({ width, height, children, dataType = "" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 113 125"
    fill="#fff"
    stroke="#000"
    strokeWidth={1}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.5"
      y="0.5"
      width="83.6"
      height="124"
      fill="white"
      stroke="black"
    />
    <line x1="83.6" y1="63" x2="111" y2="63" />
    {dots[dataType]?.third}
    {children}
  </svg>
);

const lines = {
  Int: {
    first: <polygon points="20,31 24,27  28,31 24,35" fill="black" />,
    second: <polygon points="20,94 24,90 28,94 24,98" fill="black" />,
    third: <polygon points="131,63 135,59 139,63 135,67" fill="black" />,
  },
  Float: {
    first: <polygon points="23,26 23,36 28,31" fill="black" />,
    second: <polygon points="23,89 23,99 28,94" fill="black" />,
    third: <polygon points="135,58 135,68 140,63" fill="black" />,
  },
};

export const OperationView = ({
  width,
  height,
  dataType,
  text,
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
      {lines[dataType].first}

      <line y1="94" x2="28.2014" y2="94" />
      {lines[dataType].second}

      <text
        x="105" // Правая граница viewBox
        y="20" // Смещение сверху
        fontSize="12"
        fontWeight="200"
        textAnchor="end" // Текст прижат к правой границе
        dominantBaseline="middle" // Вертикальное центрирование
      >
        {text}
      </text>

      <line x1="111.799" y1="63" x2="138" y2="63" />
      {lines[dataType].third}
    </svg>
  );
};

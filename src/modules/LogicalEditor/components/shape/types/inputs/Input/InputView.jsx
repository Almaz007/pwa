import React from "react";

export const InputView = ({ width = 210, height = 25, children }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 210 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Основной прямоугольник */}
      <rect
        x="0.5"
        y="0.5"
        width="181"
        height="24"
        fill="white"
        stroke="black"
      />

      {/* Первая линия разделителя */}
      <path d="M60 1V25" stroke="black" />

      {/* Текст "Name" */}
      <text x="100" y="17" fontFamily="Arial" fontSize="12" fill="black">
        Name
      </text>
      {children}
      {/* Последняя линия разделителя */}
      <path d="M181.5 13H209" stroke="black" />
    </svg>
  );
};

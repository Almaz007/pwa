import { useRef, useMemo } from "react";
import { wheelZoomPlugin } from "../helpers/helpers";
import { useOscilogramms, useZoomStore } from "../store/store";

export const useUPlotChart = (data, range) => {
  const uPlotRef = useRef(null);
  const updateCursorIndex = useOscilogramms((state) => state.updateCursorIndex); // Исп

  const setScaleX = useZoomStore((state) => state.setScaleX); // Функция для обновления общего масштаба
  const scaleX = useZoomStore((state) => state.scaleX); // Текущее значение масштаба по оси X

  const { xyData } = data;

  const options = {
    width: 1000,
    height: 200,
    scales: {
      x: {
        time: false,
        min: scaleX.min, // Используем общий масштаб по оси X
        max: scaleX.max,
      },
    },
    axes: [
      { show: false }, // Отключаем отображение оси X
      { show: false },
      {},
    ],
    plugins: [wheelZoomPlugin({ factor: 0.75 })],
    series: [{}, { label: "One", stroke: "red" }],
    cursor: {
      drag: { x: true, y: false },
      focus: { prox: 30 },
      sync: { key: "syncCursor" },
    },
    legend: { show: false }, // Отключаем отображение легенды
    hooks: {
      setCursor: [
        (u) => {
          const { idx } = u.cursor;
          if (idx !== null) {
            updateCursorIndex(idx); // This will now use the memoized version
          }
        },
      ],
      setScale: [
        (u, scaleKey) => {
          if (scaleKey === "x") {
            const { min, max } = u.scales.x;
            if (scaleX.min !== min && scaleX.max !== max) {
              setScaleX(min, max); // Обновляем общий масштаб по оси X
            }

            console.log(min, max);
          }
        },
      ],
    },
  };

  const chartData = useMemo(() => {
    const result = [
      [...xyData.xData].slice(range[0], range[1]),
      [...xyData.yData].slice(range[0], range[1]),
    ];

    return result;
  }, [range]);

  return {
    options,
    chartData,
    uPlotRef,
  };
  // Параметры графика
};

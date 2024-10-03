import React, { useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    annotationPlugin
);

const ChartWithVerticalLine = ({ data, options, setCursorPosition }) => {
    const chartRef = useRef(null);

    // Обработчик движения мыши
    const handleMouseMove = (event) => {
        const chart = chartRef.current;
        if (!chart) return;

        const { chartArea, scales } = chart;
        const xPosition = event.nativeEvent.offsetX;

        // Убедимся, что курсор находится внутри области графика
        if (xPosition >= chartArea.left && xPosition <= chartArea.right) {
            const xValue = scales.x.getValueForPixel(xPosition); // Получаем значение по оси X
            setCursorPosition(xValue);
        }
    };

    return (
        <div onMouseMove={handleMouseMove} style={{ position: "relative" }}>
            <Line ref={chartRef} data={data} options={options} />
        </div>
    );
};

const SyncCharts = () => {
    const [cursorPosition, setCursorPosition] = useState(null);

    const data = {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
            {
                label: "Dataset 1",
                data: [12, 19, 3, 5, 2],
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const commonOptions = {
        scales: {
            x: {
                beginAtZero: true,
            },
        },
        plugins: {
            annotation: {
                annotations:
                    cursorPosition !== null
                        ? [
                              {
                                  type: "line",
                                  mode: "vertical",
                                  scaleID: "x",
                                  value: cursorPosition,
                                  borderColor: "red",
                                  borderWidth: 2,
                              },
                          ]
                        : [],
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ width: "45%", height: "400px" }}>
                <ChartWithVerticalLine
                    data={data}
                    options={commonOptions}
                    setCursorPosition={setCursorPosition}
                />
            </div>
            <div style={{ width: "45%", height: "400px" }}>
                <ChartWithVerticalLine
                    data={data}
                    options={commonOptions}
                    setCursorPosition={setCursorPosition}
                />
            </div>
        </div>
    );
};

export default SyncCharts;

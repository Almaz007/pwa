import { memo, useMemo, useState, useRef, useEffect, forwardRef } from "react";
import { Line } from "react-chartjs-2";
import styles from "./zoomableChart.module.css";
// Регистрируем плагин для масштабирования

const ZoomableChart = memo(
    ({ data, options, cursorPosition, setCursorPosition, setZoomState }) => {
        const { xyData } = data;
        const [range, setRange] = useState([0, 100]);
        const chartRef = useRef(null);

        const chartData = useMemo(() => {
            const { xData, yData } = data.xyData;
            return {
                labels: xData.slice(range[0], range[1]), // Метки для оси X
                datasets: [
                    {
                        label: data.name,
                        data: yData.slice(range[0], range[1]), // Данные для графика
                        borderColor: "#8884d8",
                        borderWidth: 1,
                        pointRadius: 3, // Размер точек на графике
                        hoverRadius: 6, // Увеличение точки при наведении
                        pointHoverBackgroundColor: "blue", // Цвет точки при наведении
                        fill: "#8884d8",
                    },
                ],
            };
        }, [data, range]);

        const pointData = useMemo(() => {
            const time = chartData.labels[cursorPosition];
            const value = chartData.datasets[0].data[cursorPosition];
            const name = chartData.datasets[0].label;
            return { name, time, value };
        }, [cursorPosition]);

        const handleZoomIn = () => {
            if (range[1] - range[0] > 100) {
                setRange([range[0], range[1] - 100]);
            }
        };

        const handleZoomOut = () => {
            console.log("out");
            if (range[1] + 100 <= xyData.xData.length) {
                setRange([range[0], range[1] + 100]);
            }
        };

        const handleMoveLeft = () => {
            if (range[0] > 0) {
                console.log("call");

                setRange([range[0] - 100, range[1] - 100]);
            }
        };

        const handleMoveRight = () => {
            if (range[1] <= xyData.xData.length) {
                setRange([range[0] + 100, range[1] + 100]);
            }
        };

        // Обработчик движения мыши
        const handleMouseMove = (event) => {
            const chart = chartRef.current;
            if (!chart) return;

            // setZoomState({
            //     xMin: chart.scales.x.min,
            //     xMax: chart.scales.x.max,
            // });
            const { chartArea, scales } = chart;
            const xPosition = event.nativeEvent.offsetX;

            // Убедимся, что курсор находится внутри области графика
            if (xPosition >= chartArea.left && xPosition <= chartArea.right) {
                const xValue = scales.x.getValueForPixel(xPosition); // Получаем значение по оси X

                setCursorPosition(xValue);
            }
        };
        return (
            <div className={styles["ZoomableChart"]}>
                {/* <div className={styles["btn__rows"]}>
                <Button className={styles["btn"]} handleClick={handleZoomIn}>
                    Увеличить
                </Button>
                <Button className={styles["btn"]} handleClick={handleZoomOut}>
                    Уменьшить
                </Button>
                <Button className={styles["btn"]} handleClick={handleMoveLeft}>
                    ← Влево
                </Button>
                <Button className={styles["btn"]} handleClick={handleMoveRight}>
                    Вправо →
                </Button>
            </div> */}
                <div className={styles["chart__row"]}>
                    <div className={styles["point__data"]}>
                        <div className={styles["name"]}>{pointData.name}</div>
                        <div className={styles["time"]}>
                            time: {pointData.time}
                        </div>
                        <div className={styles["value"]}>
                            value {pointData.value}
                        </div>
                    </div>

                    <div
                        onMouseMove={handleMouseMove}
                        className={styles["line"]}
                    >
                        <Line
                            ref={chartRef}
                            data={chartData}
                            options={options}
                        />
                    </div>
                </div>
            </div>
        );
    }
);
export default ZoomableChart;

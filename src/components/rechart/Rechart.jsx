import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Brush,
} from "recharts";
import styles from "./rechart.module.css";

const RechartGraph = ({ data }) => {
    const xyData = data.xyData;
    const [range, setRange] = useState([0, 100]);

    const handleZoomIn = () => {
        if (range[1] - range[0] > 20) {
            setRange([range[0], range[1] - 20]);
        }
    };

    const handleZoomOut = () => {
        if (range[1] + 20 < xyData.length) {
            setRange([range[0], range[1] + 20]);
        }
    };

    const handleMoveLeft = () => {
        if (range[0] > 0) {
            setRange([range[0] - 20, range[1] - 20]);
        }
    };

    const handleMoveRight = () => {
        if (range[1] < xyData.length) {
            setRange([range[0] + 20, range[1] + 20]);
        }
    };

    // const visibleData = xyData.slice(range[0], range[1]);
    const visibleData = xyData;
    // const visibleData = xyData;
    const handleClick = (event) => {
        // setClickedPoint(data);
        console.log("click");
        console.log(event); // Обновляем состояние с данными о точке
        console.log(event.activePayload[0].payload); // Обновляем состояние с данными о точке
    };
    return (
        <div>
            <div
                style={{
                    margin: "10px",
                    display: "flex",
                    columnGap: "5px",
                }}
            >
                <button className={styles["btn"]} onClick={handleZoomIn}>
                    Увеличить
                </button>
                <button className={styles["btn"]} onClick={handleZoomOut}>
                    Уменьшить
                </button>
                <button className={styles["btn"]} onClick={handleMoveLeft}>
                    ← Влево
                </button>
                <button className={styles["btn"]} onClick={handleMoveRight}>
                    Вправо →
                </button>
            </div>

            <ResponsiveContainer width="100%" height={250}>
                <LineChart
                    data={visibleData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="x"
                        label={{
                            value: "X Axis",
                            position: "insideBottomRight",
                            offset: 0,
                        }}
                    />
                    <YAxis
                        label={{
                            value: "Y Axis",
                            angle: -90,
                            position: "insideLeft",
                        }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="y"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        onClick={(e) => handleClick(e.payload)}
                    />
                    <Brush
                        dataKey="name"
                        height={30}
                        stroke="#8884d8"
                        startIndex={0}
                        endIndex={59}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RechartGraph;

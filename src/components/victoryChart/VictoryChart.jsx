import { useState } from "react";
import {
    VictoryChart,
    VictoryLine,
    VictoryAxis,
    VictoryTheme,
    VictoryTooltip,
    VictoryVoronoiContainer,
    VictoryZoomContainer,
} from "victory";

const VictoryGraph = ({ data }) => {
    const [state, setState] = useState({});

    function handleZoom(domain) {
        setState({ selectedDomain: domain });
    }

    function handleBrush(domain) {
        setState({ zoomDomain: domain });
    }
    return (
        <div>
            <VictoryChart
                width={"1000"}
                height={300}
                theme={VictoryTheme.material} // Используем тему material
                containerComponent={
                    <VictoryZoomContainer
                        responsive={false}
                        labels={({ datum }) => `x: ${datum.x}, y: ${datum.y}`} // Всплывающие подсказки на графике
                        labelComponent={
                            <VictoryTooltip style={{ fontSize: 10 }} />
                        }
                        zoomDimension="x"
                        zoomDomain={state.zoomDomain}
                        onZoomDomainChange={handleZoom}
                    />
                }
            >
                {/* Ось X */}
                <VictoryAxis
                    label="X Axis"
                    style={{
                        axisLabel: { padding: 30 }, // Отступ для подписи оси
                        tickLabels: { fontSize: 12, padding: 5 },
                    }}
                />

                {/* Ось Y */}
                <VictoryAxis
                    dependentAxis
                    label="Y Axis"
                    style={{
                        axisLabel: { padding: 40 },
                        tickLabels: { fontSize: 12, padding: 5 },
                    }}
                />

                {/* Линия графика */}
                <VictoryLine
                    data={data.xyData} // Данные для отображения
                    style={{
                        data: { stroke: "#c43a31", strokeWidth: 2 }, // Стили для линии
                    }}
                    interpolation="natural" // Сглаживание линии
                />
            </VictoryChart>
        </div>
    );
};

export default VictoryGraph;

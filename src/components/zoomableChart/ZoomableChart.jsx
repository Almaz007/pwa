import { memo, useMemo, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import styles from './zoomableChart.module.css';

const ZoomableChart = memo(
	({
		data,
		range,
		options,
		cursorPosition,
		setCursorPosition,
		setZoomState,
		zoomState
	}) => {
		const { xyData } = data;

		const chartRef = useRef(null);

		const chartData = useMemo(() => {
			const { xData, yData } = xyData;
			return {
				labels: xData.slice(range[0], range[1]),
				datasets: [
					{
						label: data.name,
						data: yData.slice(range[0], range[1]),
						borderColor: '#8884d8',
						borderWidth: 1,
						pointRadius: 3,
						hoverRadius: 6,
						pointHoverBackgroundColor: 'blue',
						fill: '#8884d8'
					}
				]
			};
		}, [data, range]);

		const pointData = useMemo(() => {
			const time = chartData.labels[cursorPosition];
			const value = chartData.datasets[0].data[cursorPosition];
			const name = chartData.datasets[0].label;
			return { name, time, value };
		}, [cursorPosition]);

		const handleMouseMove = event => {
			const chart = chartRef.current;
			if (!chart) return;
			if (
				zoomState.xMin !== chart.scales.x.min &&
				zoomState.xMax !== chart.scales.x.max
			) {
				setZoomState({
					xMin: chart.scales.x.min,
					xMax: chart.scales.x.max
				});
			}

			const { chartArea, scales } = chart;
			const xPosition = event.nativeEvent.offsetX;

			if (xPosition >= chartArea.left && xPosition <= chartArea.right) {
				const xValue = scales.x.getValueForPixel(xPosition);

				if (xValue !== cursorPosition) {
					setCursorPosition(xValue);
				}
			}
		};
		return (
			<div className={styles['ZoomableChart']}>
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
				<div className={styles['chart__row']}>
					<div className={styles['point__data']}>
						<div className={styles['name']}>{pointData.name}</div>
						<div className={styles['time']}>time: {pointData.time}</div>
						<div className={styles['value']}>value {pointData.value}</div>
					</div>

					<div onMouseMove={handleMouseMove} className={styles['line']}>
						<Line ref={chartRef} data={chartData} options={options} />
					</div>
				</div>
			</div>
		);
	}
);
ZoomableChart.displayName = 'ZoomableChart';

export default ZoomableChart;

import React, { useState, useRef, useMemo } from 'react';
import CanvasJSReact from '@canvasjs/react-stockcharts';
const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const CanvasStockChart = ({ data, range }) => {
	// 10,000 точек данных
	const chartsRef = useRef(null);
	const mouseDownState = useRef(false);
	const [zoomState, setZoomState] = useState({});

	const chartData = useMemo(() => {
		const newChartData = data.xyData.slice(range[0], range[1]);
		setZoomState({
			xMin: 0,
			xMax: newChartData.length - 1
		});
		return newChartData;
	}, [data, range]);

	const zoomableChartData = chartData;
	console.log(zoomableChartData);
	const handleWheelZoom = event => {
		// event.preventDefault();
		const delta = Math.sign(event.deltaY); // Определение направления прокрутки

		let dif = delta * 400; // Изменяем диапазон на ±100
		const { xMin, xMax } = zoomState;

		const newXMin = xMin + dif;
		const newXMax = xMax - dif;
		console.log(newXMin, newXMax);
		if (newXMax - newXMin >= 10 && newXMin >= 0 && newXMax < chartData.length) {
			setZoomState({
				xMin: newXMin,
				xMax: newXMax
			});
		}
	};
	const handleMouseMove = event => {
		if (mouseDownState.current !== true) return;
		console.log(chartsRef.current.stockChart.navigator);
		console.log(chartsRef.current.stockChart.navigator.slider.minimum);
		console.log(chartsRef.current.stockChart.navigator.options.slider.minimum);
	};

	const options = {
		animationEnabled: true,
		exportEnabled: true,
		charts: [
			...Array.from({ length: 20 }, () => ({
				axisX: {
					crosshair: {
						enabled: true,
						snapToDataPoint: true
					},
					tickLength: 0, // Убираем длину меток по оси X
					labelFormatter: () => '' // Убираем метки
				},

				axisY: {
					tickLength: 0, // Убираем длину меток по оси X
					labelFormatter: () => '' // Убираем метки
				},
				data: [
					{
						type: 'spline',
						dataPoints: zoomableChartData
					}
				]
			}))
		],
		rangeSelector: {
			enabled: false
		},
		navigator: {
			enabled: true,
			height: 100,
			slider: !!Object.keys(zoomState).length
				? {
						minimum: chartData[zoomState.xMin].x,

						maximum: chartData[zoomState.xMax].x //Change it to new Date(2018, 05, 01)
				  }
				: {}
		}
	};
	const containerProps = {
		width: '100%',
		height: '4500px',
		margin: 'auto'
	};

	return (
		<div>
			<h1>React StockChart with Mouse Wheel Zoom</h1>
			<div
				// onWheel={handleWheelZoom}
				onMouseDown={() => (mouseDownState.current = true)}
				onMouseMove={handleMouseMove}
				onMouseUp={() => (mouseDownState.current = false)}
			>
				<CanvasJSStockChart
					ref={chartsRef}
					containerProps={containerProps}
					options={options}
				/>
			</div>
		</div>
	);
};

export default CanvasStockChart;

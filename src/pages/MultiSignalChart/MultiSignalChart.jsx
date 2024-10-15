import React, { useState } from 'react';
import Plot from 'react-plotly.js';

const xData = [...new Array(10000)].map((item, index) => index * 250);
const yData = Array.from({ length: 10000 }, () => Math.random() * 1000);

const MultiSignalChart = () => {
	const [lineX, setLineX] = useState(xData[Math.floor(xData.length / 2)]); // Начальная позиция линии

	var data = [
		{
			x: xData,
			y: yData,
			type: 'line',
			name: 'North',
			yaxis: 'y3'
		},
		{
			x: xData,
			y: yData,
			type: 'line',
			name: 'East',
			yaxis: 'y2'
		},
		{
			x: xData,
			y: yData,
			type: 'line',
			name: 'Up',
			yaxis: 'y'
		}
	];

	var layout = {
		xaxis: { title: 'Date', tickformat: '%Y/%m/%d' },
		yaxis: {
			domain: [0, 0.3],
			title: 'Up (cm)',
			range: [-4, 6],
			scaleanchor: 'y',
			scaleratio: 0.5
		},
		yaxis2: {
			domain: [0.35, 0.6],
			title: 'East (cm)',
			range: [-1, 5],
			scaleanchor: 'y',
			scaleratio: 0.5
		},
		yaxis3: {
			domain: [0.65, 1.0],
			title: 'North (cm)',
			range: [-2, 6],
			scaleanchor: 'y',
			scaleratio: 0.5
		},
		margin: {
			l: 40,
			b: 80,
			r: 10,
			t: 30
		},
		hovermode: 'closest',
		title: 'Change NEU',

		shapes: [
			{
				type: 'line',
				xref: 'x',
				yref: 'paper',
				x0: lineX, // Используем состояние для координаты X
				x1: lineX,
				y0: 0,
				y1: 1,
				line: {
					color: 'red',
					width: 2,
					dash: 'dash'
				}
			}
		]
	};

	// Обработчик для обновления позиции линии
	const handleHover = event => {
		if (event.points.length > 0) {
			setLineX(event.points[0].x); // Обновляем координату X линии
		}
	};

	return (
		<Plot
			layout={layout}
			data={data}
			useResizeHandler
			style={{ width: '1000px', height: '100%' }}
			onHover={handleHover} // Обработчик наведения мыши
			// onUnhover={() => setLineX(xData[Math.floor(xData.length / 2)])} // Сбрасываем позицию линии при уходе мыши
		/>
	);
};

export default MultiSignalChart;

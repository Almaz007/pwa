import { useRef, useMemo, memo } from 'react';
import 'uplot/dist/uPlot.min.css';
import UplotReact from 'uplot-react';
import { useOscilogramms, useZoomStore } from '../../store/store';
import shallow from 'zustand/shallow';
function wheelZoomPlugin(opts) {
	let factor = opts.factor || 0.75;

	let xMin, xMax, xRange;

	function clamp(nRange, nMin, nMax, fRange, fMin, fMax) {
		if (nRange > fRange) {
			nMin = fMin;
			nMax = fMax;
		} else if (nMin < fMin) {
			nMin = fMin;
			nMax = fMin + nRange;
		} else if (nMax > fMax) {
			nMax = fMax;
			nMin = fMax - nRange;
		}
		return [nMin, nMax];
	}

	return {
		hooks: {
			ready: u => {
				xMin = u.scales.x.min;
				xMax = u.scales.x.max;
				xRange = xMax - xMin;

				let over = u.over;
				let rect = over.getBoundingClientRect();

				// Панирование колесом мыши
				over.addEventListener('mousedown', e => {
					if (e.button === 1) {
						e.preventDefault();

						let left0 = e.clientX;
						let scXMin0 = u.scales.x.min;
						let scXMax0 = u.scales.x.max;
						let xUnitsPerPx = u.posToVal(1, 'x') - u.posToVal(0, 'x');

						function onmove(e) {
							e.preventDefault();
							let left1 = e.clientX;
							let dx = xUnitsPerPx * (left1 - left0);

							u.setScale('x', {
								min: scXMin0 - dx,
								max: scXMax0 - dx
							});
						}

						function onup() {
							document.removeEventListener('mousemove', onmove);
							document.removeEventListener('mouseup', onup);
						}

						document.addEventListener('mousemove', onmove);
						document.addEventListener('mouseup', onup);
					}
				});

				// Зуммирование колесом мыши (только по оси X)
				over.addEventListener('wheel', e => {
					e.preventDefault();

					let { left } = u.cursor;
					let leftPct = left / rect.width;
					let xVal = u.posToVal(left, 'x');
					let oxRange = u.scales.x.max - u.scales.x.min;

					let nxRange = e.deltaY < 0 ? oxRange * factor : oxRange / factor;
					let nxMin = xVal - leftPct * nxRange;
					let nxMax = nxMin + nxRange;
					[nxMin, nxMax] = clamp(nxRange, nxMin, nxMax, xRange, xMin, xMax);

					u.batch(() => {
						u.setScale('x', { min: nxMin, max: nxMax });
					});
				});
			}
		}
	};
}

const UPlotChart = memo(function UPlotChart({ data, range }) {
	const uPlotRef = useRef(null);
	const updateCursorIndex = useOscilogramms(state => state.updateCursorIndex); // Исп

	const setScaleX = useZoomStore(state => state.setScaleX); // Функция для обновления общего масштаба
	const scaleX = useZoomStore(state => state.scaleX); // Текущее значение масштаба по оси X

	const { xyData } = data;
	const options = {
		width: 1000,
		height: 200,
		scales: {
			x: {
				time: false,
				min: scaleX.min, // Используем общий масштаб по оси X
				max: scaleX.max
			}
		},
		axes: [
			{ show: false }, // Отключаем отображение оси X
			{ show: false },
			{}
		],
		plugins: [wheelZoomPlugin({ factor: 0.75 })],
		series: [{}, { label: 'One', stroke: 'red' }],
		cursor: {
			drag: { x: true, y: false },
			focus: { prox: 30 },
			sync: { key: 'syncCursor' }
		},
		legend: { show: false }, // Отключаем отображение легенды
		hooks: {
			setCursor: [
				u => {
					const { idx } = u.cursor;
					if (idx !== null) {
						updateCursorIndex(idx); // This will now use the memoized version
					}
				}
			],
			setScale: [
				(u, scaleKey) => {
					if (scaleKey === 'x') {
						const { min, max } = u.scales.x;
						if (scaleX.min !== min && scaleX.max !== max) {
							setScaleX(min, max); // Обновляем общий масштаб по оси X
						}

						console.log(min, max);
					}
				}
			]
		}
	};

	const chartData = useMemo(() => {
		const result = [
			[...xyData.xData].slice(range[0], range[1]),
			[...xyData.yData].slice(range[0], range[1])
		];

		return result;
	}, [range]);
	// Параметры графика

	return (
		<div>
			<div>
				<UplotReact
					options={options}
					data={chartData}
					onCreate={chart => {
						uPlotRef.current = chart;
					}}
				/>
			</div>
		</div>
	);
});
export default UPlotChart;

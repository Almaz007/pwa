import { useRef, useState, useMemo, useEffect } from 'react';
import Button from '../../components/UI/button/Button';
import styles from './oscilogramms.module.css';
import { useOscilogramms } from '../../store/store';
import PlotChart from '../../components/PlotChart/PlotChart';
import ChatInfo from '../../components/ChatInfo/ChatInfo';
import CustomSelect from '../../components/UI/CustomSelect/CustomSelect';

function wheelZoomPlugin(opts) {
	let factor = opts.factor || 0.75;

	let xMin, xMax, yMin, yMax, xRange, yRange;

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
				yMin = u.scales.y.min;
				yMax = u.scales.y.max;

				xRange = xMax - xMin;
				yRange = yMax - yMin;

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

				// Зуммирование колесом мыши
				over.addEventListener('wheel', e => {
					e.preventDefault();

					let { left, top } = u.cursor;
					let leftPct = left / rect.width;
					let btmPct = 1 - top / rect.height;
					let xVal = u.posToVal(left, 'x');
					let yVal = u.posToVal(top, 'y');
					let oxRange = u.scales.x.max - u.scales.x.min;
					let oyRange = u.scales.y.max - u.scales.y.min;

					let nxRange = e.deltaY < 0 ? oxRange * factor : oxRange / factor;
					let nxMin = xVal - leftPct * nxRange;
					let nxMax = nxMin + nxRange;
					[nxMin, nxMax] = clamp(nxRange, nxMin, nxMax, xRange, xMin, xMax);

					let nyRange = e.deltaY < 0 ? oyRange * factor : oyRange / factor;
					let nyMin = yVal - btmPct * nyRange;
					let nyMax = nyMin + nyRange;
					[nyMin, nyMax] = clamp(nyRange, nyMin, nyMax, yRange, yMin, yMax);

					u.batch(() => {
						u.setScale('x', { min: nxMin, max: nxMax });
						u.setScale('y', { min: nyMin, max: nyMax });
					});
				});
			}
		}
	};
}
// Регистрируй компоненты
const Oscilogramms = () => {
	const {
		handleCfgFile,
		handleDataFile,
		cfgData,
		sginalsData,
		signalsLoaded,
		cfgLoaded,
		generateChartsData,
		chartsData
	} = useOscilogramms(state => state);

	const [range, setRange] = useState([0, 22000]);

	// Функция для синхронизации зуммирования

	const cfgFileBtnRef = useRef(null);
	const dataFileBtnRef = useRef(null);

	const handleCfgButtonClick = () => {
		cfgFileBtnRef.current.click();
	};
	const handleDataButtonClick = () => {
		dataFileBtnRef.current.click();
	};

	// const options = {
	// 	width: 1000,
	// 	height: 200,
	// 	scales: {
	// 		x: { time: false }
	// 	},
	// 	axes: [
	// 		{ show: false }, // Отключаем отображение оси X
	// 		{ show: false },
	// 		{}
	// 	],
	// 	series: [{}, { label: 'One', stroke: 'red' }],
	// 	cursor: {
	// 		drag: { x: true, y: false },
	// 		focus: { prox: 30 },
	// 		sync: { key: 'syncCursor' }
	// 	}
	// 	// hooks: {
	// 	// 	setCursor: [
	// 	// 		u => {
	// 	// 			const { idx } = u.cursor;
	// 	// 			if (idx !== null) {
	// 	// 				updateCursorIndex(idx); // This will now use the memoized version
	// 	// 			}
	// 	// 		}
	// 	// 	]
	// 	// }
	// };
	const handleZoomIn = () => {
		if (range[1] - range[0] > 30) {
			setRange([range[0], range[1] - 30]);
		}
	};

	const handleZoomOut = () => {
		if (range[1] + 30 <= chartsData[0].xyData.xData.length) {
			setRange([range[0], range[1] + 30]);
			setZoomState({
				xMin: range[0],
				xMax: range[1] + 30
			});
		}
	};

	const handleMoveLeft = () => {
		if (range[0] > 0) {
			console.log('call');

			setRange([range[0] - 30, range[1] - 30]);
		}
	};

	const handleMoveRight = () => {
		if (range[1] <= chartsData[0].xyData.xData.length) {
			setRange([range[0] + 30, range[1] + 30]);
		}
	};

	useEffect(() => {
		if (signalsLoaded && cfgLoaded) {
			generateChartsData();
		}
	}, [signalsLoaded, cfgLoaded]);

	return (
		<div>
			<div className={styles['btn__row']}>
				<div className={styles['fileBtn']}>
					<Button handleClick={handleCfgButtonClick}>{'Загрузить cfg'}</Button>
					<input
						ref={cfgFileBtnRef}
						type='file'
						onChange={handleCfgFile}
						accept='.cfg'
						hidden
					/>
					{cfgLoaded && (
						<p className='download__status'>загружен {cfgData.fileName}</p>
					)}
				</div>
				<div className={styles['fileBtn']}>
					<Button handleClick={handleDataButtonClick}>
						{'Загрузить данные'}
					</Button>
					<input
						ref={dataFileBtnRef}
						type='file'
						onChange={handleDataFile}
						hidden
						accept='.dat, .csv'
					/>
					{signalsLoaded && (
						<p className='download__status'>загружен {sginalsData.fileName}</p>
					)}
				</div>
			</div>
			{!!chartsData.length && (
				<>
					<div className={styles['btn__row']}>
						<Button className={styles['btn']} handleClick={handleZoomIn}>
							Увеличить
						</Button>
						<Button className={styles['btn']} handleClick={handleZoomOut}>
							Уменьшить
						</Button>
						<Button className={styles['btn']} handleClick={handleMoveLeft}>
							← Влево
						</Button>
						<Button className={styles['btn']} handleClick={handleMoveRight}>
							Вправо →
						</Button>
					</div>
					<CustomSelect channels={chartsData} />
					<div className={styles['charts']}>
						{chartsData
							// .slice(0, 3)
							.map(data =>
								data.visible ? (
									<div key={data.id} className={styles['row__chart']}>
										<ChatInfo data={data} />
										<PlotChart
											key={data.id}
											data={data}
											// options={options}
											range={range}
										/>
									</div>
								) : (
									''
								)
							)}
					</div>
				</>
			)}
		</div>
	);
};

export default Oscilogramms;

{
	/* {!!chartsData.length && (
	// 			<>
	// 				<div className={styles['btn__row']}>
	// 					<Button className={styles['btn']} handleClick={handleZoomIn}>
	// 						Увеличить
	// 					</Button>
	// 					<Button className={styles['btn']} handleClick={handleZoomOut}>
	// 						Уменьшить
	// 					</Button>
	// 					<Button className={styles['btn']} handleClick={handleMoveLeft}>
	// 						← Влево
	// 					</Button>
	// 					<Button className={styles['btn']} handleClick={handleMoveRight}>
	// 						Вправо →
	// 					</Button>
	// 				</div>
	// 				<CustomSelect channels={chartsData} />
	// 				<div className={styles['charts']}>
	// 					{chartsData
	// 						.slice(0, 3)
	// 						.map(data =>
	// 							data.visible ? (
	// 								<ZoomableChart
	// 									key={data.id}
	// 									data={data}
	// 									options={options}
	// 									cursorPosition={cursorPosition}
	// 									setCursorPosition={setCursorPosition}
	// 									setZoomState={setZoomState}
	// 									zoomState={zoomState}
	// 									range={range}
	// 									setRange={setRange}
	// 								/>
	// 							) : (
	// 								''
	// 							)
	// 						)}
	// 				</div>
	// 			</>
	// 		)} */
}

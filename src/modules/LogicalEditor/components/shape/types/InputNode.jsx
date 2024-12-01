export const InputNode = ({ width, height, ...svgAttributes }) => {
	const rectHeight = height;
	const leftRectWidth = width * 0.28; // Левая часть — 25% ширины
	const rightRectWidth = width * 0.46; // Центральная часть — 50% ширины
	const lineLength = width * 0.13;

	return (
		<svg width={width} height={height} style={{ display: 'block' }}>
			{/* Прямоугольник левой части */}
			<rect
				x={0}
				y={0}
				width={leftRectWidth}
				height={rectHeight}
				fill='white'
				stroke='black'
			/>
			<text
				x={leftRectWidth / 2} // Центрируем по ширине
				y={rectHeight / 2} // Центрируем по высоте
				fontSize={rectHeight / 3}
				fill='black'
				textAnchor='middle' // Центр по горизонтали
				dominantBaseline='middle' // Центр по вертикали
			>
				012345
			</text>

			{/* Прямоугольник центральной части */}
			<rect
				x={leftRectWidth}
				y={0}
				width={rightRectWidth}
				height={rectHeight}
				fill='white'
				stroke='black'
			/>
			<text
				x={leftRectWidth + rightRectWidth / 2}
				y={height / 2}
				fontSize={rectHeight / 3}
				fill='black'
				textAnchor='middle' // Центр по горизонтали
				dominantBaseline='middle' // Центр по вертикали
			>
				{'name'} {/* Динамическое поле */}
			</text>
		</svg>
	);
};

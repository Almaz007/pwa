import { useEffect, useRef } from 'react';

const CanvasChart = ({ data }) => {
	const canvasRef = useRef(null);
	const { xyData } = data;

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		const width = canvas.width - 20;
		const height = canvas.height - 20;

		const yData = xyData.yData.slice(0, 100);
		const xData = xyData.xData.slice(0, 100);

		const maxValue = Math.max(...xyData.yData.slice(0, 100));
		const tempMinValue = Math.min(...xyData.yData.slice(0, 100));

		const minValue = tempMinValue < 0 ? tempMinValue : 0;

		const valueRange = maxValue - minValue;
		ctx.clearRect(0, 0, width, height);

		ctx.strokeStyle = '#007BFF';
		ctx.lineWidth = 2;

		// const scaleY = value => (value / maxValue) * height;
		const scaleY = value => ((value - minValue) / valueRange) * height;

		ctx.beginPath();
		ctx.moveTo(0, height - scaleY(yData[0]) + 10);

		xData.forEach((point, index) => {
			const x = (index / (xData.length - 1)) * width;
			const y = height - scaleY(yData[index]);
			ctx.lineTo(x, y);
			// ctx.fillRect(x, y, 4, 4);
		});

		ctx.stroke();
	}, []);

	return <canvas ref={canvasRef} width={1020} height={170}></canvas>;
};

export default CanvasChart;

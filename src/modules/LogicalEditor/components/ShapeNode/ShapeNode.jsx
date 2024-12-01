import { Shape } from '../shape';

const ShapeNode = ({ id, width, height, data }) => {
	const { type } = data;
	console.log(type);
	return (
		<Shape
			type={type}
			width={width}
			height={height}
			fill={'#fff'}
			strokeWidth={1}
			stroke={'#000'}
		/>
	);
};

export default ShapeNode;

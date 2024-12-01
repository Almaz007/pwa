import { ShapeComponents } from './types';

export const Shape = ({ type, width, height, ...svgAttributes }) => {
	const ShapeComponent = ShapeComponents[type];

	if (!ShapeComponent || !width || !height) {
		return null;
	}
	return <ShapeComponent width={width} height={height} {...svgAttributes} />;
};

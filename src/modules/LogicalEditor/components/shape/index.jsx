import { ShapeComponents } from "./types";

export const Shape = ({ id, data, width, height }) => {
  const { type } = data;
  const ShapeComponent = ShapeComponents[type].all;

  if (!ShapeComponent || !width || !height) {
    return null;
  }
  console.log(type);
  return <ShapeComponent id={id} width={width} height={height} data={data} />;
};

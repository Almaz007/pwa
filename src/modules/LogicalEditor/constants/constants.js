import { MarkerType } from '@xyflow/react';
import InputNode from '../components/InputNode/Inputnode';
import OutputNode from '../components/OutputNode/OutputNode';
import LogicAnd from '../components/LogicAnd/LogicAnd';
import GroupNode from '../components/GroupNode/GroupNode';
import ShapeNode from '../components/ShapeNode/ShapeNode';

export const defaultEdgeOptions = {
	style: {
		strokeWidth: 2
	},
	markerEnd: {
		type: MarkerType.ArrowClosed
	}
};
export const proOptions = {
	hideAttribution: true
};

export const nodeTypes = {
	shape: ShapeNode,
	outputNode: OutputNode,
	logicAnd: LogicAnd,
	groupNode: GroupNode
};

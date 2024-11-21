import {
	getNodePositionWithOrigin,
	getBoundsOfBoxes,
	rectToBox,
	boxToRect
} from '@xyflow/system';
import { v4 as uuidv4 } from 'uuid';
import { customAlphabet } from 'nanoid';
import { nanoid } from 'nanoid';
export const getNodePositionInsideParent = (node, groupNode) => {
	const position = node.position ?? { x: 0, y: 0 };
	const nodeWidth = node.width ?? 0;
	const nodeHeight = node.height ?? 0;
	const groupWidth = groupNode.measured.width ?? 0;
	const groupHeight = groupNode.measured.height ?? 0;

	if (position.x < groupNode.position.x) {
		position.x = 0;
	} else if (position.x + nodeWidth > groupNode.position.x + groupWidth) {
		position.x = groupWidth - nodeWidth;
	} else {
		position.x = position.x - groupNode.position.x;
	}

	if (position.y < groupNode.position.y) {
		position.y = 0;
	} else if (position.y + nodeHeight > groupNode.position.y + groupHeight) {
		position.y = groupHeight - nodeHeight;
	} else {
		position.y = position.y - groupNode.position.y;
	}

	return position;
};

export const generateNode = (type, position, style) => {
	const nanoid = customAlphabet('12345', 5);
	const id = nanoid();

	switch (type) {
		case 'inputNode': {
			const node = {
				id,
				type,
				position,
				data: {
					value: false
				}
			};
			return node;
		}
		case 'logicAnd': {
			const node = {
				id,
				type,
				position,
				data: {
					value: undefined
				}
			};
			return node;
		}
		case 'outputNode': {
			const node = {
				id,
				type,
				position,
				data: {}
			};
			return node;
		}
		case 'groupNode': {
			const node = {
				id,
				type,
				position,
				data: {},
				style: style ?? {
					width: 600,
					height: 400
				}
			};
			return node;
		}
	}
};

export const sortNodes = (a, b) => {
	if (a.type === b.type) {
		return 0;
	}
	return a.type === 'groupNode' && b.type !== 'groupNode' ? -1 : 1;
};

export const getRelativeNodesBounds = (nodes, nodeOrigin = [0, 0]) => {
	if (nodes.length === 0) {
		return { x: 0, y: 0, width: 0, height: 0 };
	}

	const box = nodes.reduce(
		(currBox, node) => {
			const { x, y } = getNodePositionWithOrigin(node, nodeOrigin);

			return getBoundsOfBoxes(
				currBox,
				rectToBox({
					x,
					y,
					width: node?.measured?.width || 0,
					height: node?.measured?.height || 0
				})
			);
		},
		{
			x: Infinity,
			y: Infinity,
			x2: -Infinity,
			y2: -Infinity
		}
	);
	return boxToRect(box);
};

export const isEqual = (prev, next) => {
	return (
		prev.minWidth === next.minWidth &&
		prev.minHeight === next.minHeight &&
		prev.hasChildNodes === next.hasChildNodes
	);
};

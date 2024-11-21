import { useReactFlow, getOutgoers } from '@xyflow/react';
import { useLogicalEditor } from '../store/store';
import { selector } from '../store/selectors';
import { shallow } from 'zustand/shallow';
import InputNode from '../components/InputNode/Inputnode';
import OutputNode from '../components/OutputNode/OutputNode';
import LogicAnd from '../components/LogicAnd/LogicAnd';
import GroupNode from '../components/GroupNode/GroupNode';
import { useCallback } from 'react';
import {
	generateNode,
	getNodePositionInsideParent,
	sortNodes
} from '../helpers/helpers';

const useLogcalEditor = () => {
	const { nodes, edges, onNodesChange, onEdgesChange, addEdge, addNode } =
		useLogicalEditor(selector, shallow);
	const {
		screenToFlowPosition,
		getIntersectingNodes,
		getNodes,
		getEdges,
		setNodes
	} = useReactFlow();

	const nodeTypes = {
		inputNode: InputNode,
		outputNode: OutputNode,
		logicAnd: LogicAnd,
		groupNode: GroupNode
	};
	const isValidConnection = connection => {
		const nodes = getNodes();
		const edges = getEdges();
		const target = nodes.find(node => node.id === connection.target);

		const hasCycle = (node, visited = new Set()) => {
			if (visited.has(node.id)) return false;

			visited.add(node.id);

			for (const outgoer of getOutgoers(node, nodes, edges)) {
				if (outgoer.id === connection.source) return true;
				if (hasCycle(outgoer, visited)) return true;
			}
		};

		if (connection.source === target.id) return false;
		return !hasCycle(target);
	};
	const onDragOver = useCallback(event => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);
	const onDrop = event => {
		event.preventDefault();
		const type = event.dataTransfer.getData('application/reactflow');

		const position = screenToFlowPosition({
			x: event.clientX,
			y: event.clientY
		});

		const intersections = getIntersectingNodes({
			x: position.x,
			y: position.y,
			width: 230,
			height: 20
		}).filter(n => n.type === 'groupNode');
		const groupNode = intersections[0];

		const newNode = generateNode(type, position);

		if (groupNode) {
			// if we drop a node on a group node, we want to position the node inside the group
			newNode.position = getNodePositionInsideParent(
				{
					position,
					width: 230,
					height: 20
				},
				groupNode
			) ?? { x: 0, y: 0 };
			newNode.parentId = groupNode?.id;
			// newNode.extent = 'parent';
			newNode.expandParent = true;
		}

		addNode(newNode);
	};
	const onNodeDragStop = useCallback(
		(_, node) => {
			if (node.type === 'groupNode' || node.parentId) {
				return;
			}

			const intersections = getIntersectingNodes(node).filter(
				n => n.type === 'groupNode'
			);

			if (intersections.length) {
				const groupNode = intersections[0];
				const nextNodes = nodes
					.map(n => {
						if (n.id === groupNode.id) {
							return {
								...n,
								className: ''
							};
						} else if (n.id === node.id) {
							const position = getNodePositionInsideParent(n, groupNode) ?? {
								x: 0,
								y: 0
							};
							console.log(position);
							return {
								...n,
								position,
								parentId: groupNode.id,
								extent: 'parent'
							};
						}

						return n;
					})
					.sort(sortNodes);

				setNodes(nextNodes);
			}
		},
		[getIntersectingNodes, setNodes, nodes]
	);
	const onNodeDrag = (e, node) => {
		if (node.type === 'groupNode' || node.parentId) {
			return;
		}
		const intersections = getIntersectingNodes(node).filter(
			n => n.type === 'groupNode'
		);

		const groupClassName = intersections.length ? 'active' : '';

		setNodes(
			nodes.map(n => {
				if (n.type === 'groupNode') {
					return {
						...n,
						className: groupClassName
					};
				} else if (n.id === node.id) {
					return {
						...n,
						position: node.position
					};
				}

				return { ...n };
			})
		);
	};

	return {
		nodes,
		edges,
		onNodesChange,
		onEdgesChange,
		addEdge,
		nodeTypes,
		isValidConnection,
		onDragOver,
		onDrop,
		onNodeDragStop,
		onNodeDrag
	};
};

export default useLogcalEditor;

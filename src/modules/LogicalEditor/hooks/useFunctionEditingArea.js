import {
	useNodesState,
	useEdgesState,
	getConnectedEdges,
	getOutgoers,
	useReactFlow,
	addEdge
} from '@xyflow/react';
import { useMemo, useCallback, useState, useRef } from 'react';
import { useLogicalEditor } from '../store/store';
import {
	generateNode,
	getNodePositionInsideParent,
	sortNodes
} from '../helpers/helpers';
import { shallow } from 'zustand/shallow';

export const useFunctionEditingArea = id => {
	const {
		nodes: globallNodes,
		edges: globalEdges,
		setNodes: setGlobalNodes,
		setEdges: setGlobalEdges
	} = useLogicalEditor(
		store => ({
			nodes: store.nodes,
			edges: store.edges,
			setNodes: store.setNodes,
			setEdges: store.setEdges
		}),
		shallow
	);
	const groupPosition = useRef(null);

	const filteredNodes = useMemo(() => {
		return globallNodes.reduce((acc, node) => {
			if (node.id === id) {
				// acc.push({ ...node, position: { x: 0, y: 0 } });
				groupPosition.current = node.position;
				acc.push(node);
			}
			if (node.parentId === id) {
				acc.push(node);
			}

			return acc;
		}, []);
	}, []);

	const filteredEdges = useMemo(() => {
		return getConnectedEdges(filteredNodes, globalEdges).filter(edge => {
			const isExternalSource = filteredNodes.every(n => n.id !== edge.source);
			const isExternalTarget = filteredNodes.every(n => n.id !== edge.target);

			return !(isExternalSource || isExternalTarget);
		});
	}, []);

	const [nodes, setNodes, onNodesChange] = useNodesState(filteredNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(filteredEdges);

	const onConnect = useCallback(
		params => setEdges(eds => addEdge(params, eds)),
		[]
	);

	const { getIntersectingNodes, screenToFlowPosition } = useReactFlow();

	const isValidConnection = connection => {
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
			console.log(newNode);
			setNodes(prev => [...prev, newNode]);
		}
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
		if (node.type === ' ' || node.parentId) {
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
	const saveChanges = () => {
		const filteredGlobalNodes = globallNodes.filter(
			node => !node.id === id || !node.parentId === id
		);
		const filteredGlobalEdges = globalEdges.filter(
			edge => !filteredEdges.some(filteredEdge => filteredEdge.id === edge.id)
		);

		const newNodes = nodes.map(node =>
			node.id === id ? { ...node, position: groupPosition.current } : node
		);

		const updatedNodes = [...filteredGlobalNodes, ...newNodes].sort(sortNodes);
		const updatedEdges = [...filteredGlobalEdges, ...edges];

		setGlobalNodes(updatedNodes);
		setGlobalEdges(updatedEdges);
	};

	return {
		nodes,
		onNodesChange,
		edges,
		onEdgesChange,
		onConnect,
		isValidConnection,
		onDragOver,
		onDrop,
		onNodeDragStop,
		saveChanges
	};
};

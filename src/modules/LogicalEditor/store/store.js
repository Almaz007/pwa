import { applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { createWithEqualityFn } from 'zustand/traditional';
import { v4 as uuidv4 } from 'uuid';
import { sortNodes } from '../helpers/helpers';

export const useLogicalEditor = createWithEqualityFn((set, get) => ({
	nodes: [],
	edges: [],
	nodeType: null,

	setNodeType(type) {
		set({ nodeType: type });
	},
	onNodesChange(changes) {
		set({
			nodes: applyNodeChanges(changes, get().nodes)
		});
	},
	onEdgesChange(changes) {
		set({
			edges: applyEdgeChanges(changes, get().edges)
		});
	},
	addEdge(data) {
		const id = uuidv4();
		const edge = { id, ...data, animated: true };

		set({ edges: [edge, ...get().edges] });
	},
	createNode(node) {
		set(state => ({ nodes: [...state.nodes, node] }));
	},
	addNode(newNode) {
		const { nodes } = get();
		const sortedNodes = [...nodes, newNode].sort(sortNodes);
		set({ nodes: [...sortedNodes] });
	},
	setNodes(nodes) {
		set({
			nodes: [...nodes]
		});
	}
}));

import {
	ReactFlow,
	ReactFlowProvider,
	Background,
	Controls,
	useReactFlow
} from '@xyflow/react';
import { shallow } from 'zustand/shallow';
import { useSetpoints } from '../../store/store';

import '@xyflow/react/dist/style.css';
import FlowSidebar from '../../components/FlowSidebar/FlowSidebar';
import { useCallback } from 'react';

const selector = store => ({
	nodes: store.nodes,
	edges: store.edges,
	onNodesChange: store.onNodesChange,
	onEdgesChange: store.onEdgesChange,
	addEdge: store.addEdge,
	nodeType: store.nodeType,
	createNode: store.createNode
});

function Flow() {
	const store = useSetpoints(selector, shallow);
	const { screenToFlowPosition } = useReactFlow();

	const onDragOver = useCallback(event => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);

	const onDrop = useCallback(
		event => {
			event.preventDefault();
			if (!store.nodeType) return;

			const position = screenToFlowPosition({
				x: event.clientX,
				y: event.clientY
			});

			store.createNode(store.nodeType, position);
		},
		[store.nodeType, screenToFlowPosition]
	);

	return (
		<>
			<div style={{ width: '100%', height: '100%' }}>
				<ReactFlow
					nodes={store.nodes}
					edges={store.edges}
					onNodesChange={store.onNodesChange}
					onEdgesChange={store.onEdgesChange}
					onConnect={store.addEdge}
					onDrop={onDrop}
					onDragOver={onDragOver}
					fitView
				>
					<Background />
					<Controls />
				</ReactFlow>
			</div>
			<FlowSidebar />
		</>
	);
}

export default function Setpoints() {
	return (
		<ReactFlowProvider>
			<Flow />
		</ReactFlowProvider>
	);
}

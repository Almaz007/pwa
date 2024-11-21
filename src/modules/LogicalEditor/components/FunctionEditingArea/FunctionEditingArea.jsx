import { Link, useNavigate, useParams } from 'react-router-dom';
import ElementsPanel from '../ElementsPanel/ElementsPanel';
import styles from './FunctionEditingArea.module.css';
import { IoMdArrowBack } from 'react-icons/io';
import { Background, Controls, MarkerType, ReactFlow } from '@xyflow/react';
import SelectedNodesToolbar from '../SelectedNodesToolbar/SelectedNodesToolbar.jsx';
import { useMemo } from 'react';
import useLogcalEditor from '../../hooks/useLogicalEditor.jsx';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

const StyledButton = styled(Button)({
	fontSize: '18px',
	textTransform: 'lowercase'
});

const FunctionEditingArea = ({ children }) => {
	const {
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
	} = useLogcalEditor();

	const { id } = useParams();
	const initialNodes = useMemo(() => {
		return nodes.filter(node => node.id === id || node.parentId === id);
	}, [nodes, id]);

	const defaultEdgeOptions = {
		style: {
			strokeWidth: 2
		},
		markerEnd: {
			type: MarkerType.ArrowClosed
		}
	};
	const proOptions = {
		hideAttribution: true
	};
	console.log(nodes);
	console.log(initialNodes);
	return (
		<div className={styles['editing__area']}>
			<Link to={'/setpoints/logicalEditor'} className={styles['back__link']}>
				<StyledButton startIcon={<IoMdArrowBack />} variant='text'>
					на главную
				</StyledButton>
			</Link>
			<div className={styles['flow']}>
				<ReactFlow
					nodes={initialNodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={addEdge}
					nodeTypes={nodeTypes}
					defaultEdgeOptions={defaultEdgeOptions}
					proOptions={proOptions}
					isValidConnection={isValidConnection}
					onDragOver={onDragOver}
					onDrop={onDrop}
					onNodeDragStop={onNodeDragStop}
					onNodeDrag={onNodeDrag}
				>
					<SelectedNodesToolbar />
					<Background />
					<Controls />
				</ReactFlow>
			</div>
			<ElementsPanel />
		</div>
	);
};

export default FunctionEditingArea;

import { Link, useParams } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import {
	Background,
	Controls,
	ReactFlowProvider,
	ReactFlow,
	Panel
} from '@xyflow/react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import SelectedNodesToolbar from '../SelectedNodesToolbar/SelectedNodesToolbar.jsx';
import ElementsPanel from '../ElementsPanel/ElementsPanel';
import styles from './FunctionEditingArea.module.css';
import {
	proOptions,
	defaultEdgeOptions,
	nodeTypes
} from '../../constants/constants.js';
import { useFunctionEditingArea } from '../../hooks/useFunctionEditingArea.js';
import '@xyflow/react/dist/style.css';
const StyledButton = styled(Button)({
	fontSize: '18px',
	textTransform: 'lowercase'
});
function FunctionEditingAreaContent() {
	const { id } = useParams();
	const {
		nodes,
		onNodesChange,
		edges,
		onEdgesChange,
		isValidConnection,
		onDragOver,
		onDrop,
		onNodeDragStop,
		onConnect,
		saveChanges
	} = useFunctionEditingArea(id);

	return (
		<div className={styles['editing__area']}>
			<div className={styles['configuration']}>
				<Link to={'/setpoints/logicalEditor'} className={styles['back__link']}>
					<StyledButton startIcon={<IoMdArrowBack />} variant='text'>
						на главную
					</StyledButton>
				</Link>
				<StyledButton variant='contained' onClick={() => saveChanges()}>
					применить
				</StyledButton>
			</div>
			<div className={styles['flow']}>
				<ReactFlow
					nodes={nodes}
					onNodesChange={onNodesChange}
					edges={edges}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					nodeTypes={nodeTypes}
					defaultEdgeOptions={defaultEdgeOptions}
					proOptions={proOptions}
					isValidConnection={isValidConnection}
					fitView
					onDragOver={onDragOver}
					onDrop={onDrop}
					onNodeDragStop={onNodeDragStop}
				>
					<SelectedNodesToolbar />
					<Background />
					<Controls />
				</ReactFlow>
			</div>
			<ElementsPanel />
		</div>
	);
}

const FunctionEditingArea = () => {
	return (
		<ReactFlowProvider>
			<FunctionEditingAreaContent />
		</ReactFlowProvider>
	);
};
export default FunctionEditingArea;

import {
	Handle,
	useHandleConnections,
	useNodesData,
	Position
} from '@xyflow/react';
import styles from './OutputNode.module.css';
import CustomNodeToolbar from '../CustomNodeToolbar/CustomNodeToolbar';
import useToolbar from '../../hooks/useToolbar';

const OutputNode = ({ id, data }) => {
	const connections = useHandleConnections({
		type: 'target',
		id: 'out'
	});
	const { onDelete, onDetach, hasParent } = useToolbar(id);

	const node = useNodesData(connections?.[0]?.source);
	const value = node?.data?.value;
	return (
		<div className={styles['output__node']}>
			<div className='id__block' style={{ textAlign: 'center' }}>
				{id}
			</div>
			<div>{value === null ? 'нет результатов' : `${value}`}</div>
			<CustomNodeToolbar>
				<button onClick={onDelete}>delete</button>
				{hasParent && <button onClick={onDetach}>detach</button>}
			</CustomNodeToolbar>
			<Handle
				type='target'
				id='out'
				position={Position.Left}
				isConnectable={connections.length < 1}
			/>
		</div>
	);
};

export default OutputNode;

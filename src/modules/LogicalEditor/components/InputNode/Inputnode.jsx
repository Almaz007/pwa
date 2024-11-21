import { GrPowerReset } from 'react-icons/gr';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { useStore } from '@xyflow/react';

import styles from './InputNode.module.css';
import useDetachNodes from '../../hooks/useDetachNodes';
import CustomNodeToolbar from '../CustomNodeToolbar/CustomNodeToolbar';
import useToolbar from '../../hooks/useToolbar';

const InputNode = ({ id, data }) => {
	const { value } = data;
	const { updateNodeData } = useReactFlow();
	const { onDelete, onDetach, hasParent } = useToolbar(id);
	return (
		<div className={styles['input__node']}>
			<div className='id__block' style={{ padding: '10px' }}>
				{id}
			</div>
			<div className={styles['name__row']}>
				<label className={styles['label']}>name:</label>
				<input type='text' className={styles['input']} />
			</div>
			<div className={styles['value__row']}>
				<button>
					<GrPowerReset onClick={() => updateNodeData(id, { value: !value })} />
				</button>
				<div className='value'>{value ? 'true' : 'false'}</div>
			</div>
			<Handle type='source' position={Position.Right} />
			<CustomNodeToolbar>
				<button onClick={onDelete}>delete</button>
				{hasParent && <button onClick={onDetach}>detach</button>}
			</CustomNodeToolbar>
		</div>
	);
};

export default InputNode;

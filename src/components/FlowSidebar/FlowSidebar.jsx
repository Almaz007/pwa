import styles from './FlowSidebar.module.css';
import cn from 'classnames';
import { useSetpoints } from '../../store/store';
import { shallow } from 'zustand/shallow';
import { memo } from 'react';

const selector = state => ({
	setNodeType: state.setNodeType
});

const FlowSidebar = memo(function FlowSidebar() {
	const { setNodeType } = useSetpoints(selector, shallow);

	const onDragStart = (event, nodeType) => {
		setNodeType(nodeType);
		event.dataTransfer.effectAllowed = 'move';
	};
	return (
		<aside className={styles['aside']}>
			<div className={styles['description']}>
				You can drag these nodes to the pane on the right.
			</div>
			<div
				className={cn(styles['dndnode'], styles['input'])}
				onDragStart={event => onDragStart(event, 'input')}
				draggable
			>
				Input Node
			</div>
			<div
				className={styles['dndnode']}
				onDragStart={event => onDragStart(event, 'logika')}
				draggable
			>
				Default Node
			</div>
			<div
				className={cn(styles['dndnode'], styles['output'])}
				onDragStart={event => onDragStart(event, 'output')}
				draggable
			>
				Output Node
			</div>
		</aside>
	);
});

export default FlowSidebar;

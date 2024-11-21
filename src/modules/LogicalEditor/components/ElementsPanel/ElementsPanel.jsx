import styles from './ElementsPanel.module.css';
import cn from 'classnames';
import { useLogicalEditor } from '../../store/store';
import { shallow } from 'zustand/shallow';
import { setNodeTypeSelector } from '../../store/selectors';

const ElementsPanel = function FlowSidebar() {
	const { setNodeType } = useLogicalEditor(setNodeTypeSelector, shallow);

	const onDragStart = (event, nodeType) => {
		// setNodeType(nodeType);
		event.dataTransfer.setData('application/reactflow', nodeType);
		event.dataTransfer.effectAllowed = 'move';
	};

	return (
		<aside className={styles['aside']}>
			<div className={styles['description']}>
				You can drag these nodes to the pane on the right.
			</div>
			<div
				className={cn(styles['dndnode'], styles['input'])}
				onDragStart={event => onDragStart(event, 'inputNode')}
				draggable
			>
				Input Node
			</div>
			<div
				className={styles['dndnode']}
				onDragStart={event => onDragStart(event, 'logicAnd')}
				draggable
			>
				LogicAnd Node
			</div>
			<div
				className={cn(styles['dndnode'], styles['output'])}
				onDragStart={event => onDragStart(event, 'outputNode')}
				draggable
			>
				Output Node
			</div>
			{/* <div
				className={cn(styles['dndnode'], styles['output'])}
				onDragStart={event => onDragStart(event, 'groupNode')}
				draggable
			>
				Group Node
			</div> */}
		</aside>
	);
};

export default ElementsPanel;

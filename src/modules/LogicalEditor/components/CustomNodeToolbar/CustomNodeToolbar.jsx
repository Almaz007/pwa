import { NodeToolbar } from '@xyflow/react';
import styles from './CustomNodeToolbar.module.css';

const CustomNodeToolbar = ({ children, ...props }) => {
	return (
		<NodeToolbar {...props}>
			<div className={styles['toolbar']}>{children}</div>
		</NodeToolbar>
	);
};

export default CustomNodeToolbar;

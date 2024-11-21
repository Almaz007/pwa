import { ReactFlowProvider } from '@xyflow/react';
import styles from './LogicalEditorLayout.module.css';
import { Outlet } from 'react-router-dom';
import SetpointMenu from '../SetpointMenu/SetpointMenu';
import './xy-theme.css';
const LogicalEditorLayout = () => {
	return (
		<ReactFlowProvider>
			<div className={styles['layout']}>
				<div className={styles['configuraton']}>
					<SetpointMenu />
				</div>

				<Outlet />
			</div>
		</ReactFlowProvider>
	);
};

export default LogicalEditorLayout;
//

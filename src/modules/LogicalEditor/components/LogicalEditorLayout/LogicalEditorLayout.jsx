import styles from './LogicalEditorLayout.module.css';
import { Outlet } from 'react-router-dom';
import SetpointMenu from '../SetpointMenu/SetpointMenu';
const LogicalEditorLayout = () => {
	return (
		<div className={styles['layout']}>
			<div className={styles['configuraton']}>
				<SetpointMenu />
			</div>

			<Outlet />
		</div>
	);
};

export default LogicalEditorLayout;

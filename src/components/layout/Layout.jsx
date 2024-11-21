import { Outlet } from 'react-router-dom';
import styles from './layout.module.css';
import { Sidebar } from '../sidebar/Sidebar';

const Layout = () => {
	return (
		<div className={styles['layout']}>
			<Sidebar />
			<main className={styles['main']}>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;

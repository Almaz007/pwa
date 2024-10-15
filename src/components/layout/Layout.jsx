import { Outlet } from 'react-router-dom';
import styles from './layout.module.css';
// import Header from '../header/Header';
import { Sidebar } from '../sidebar/Sidebar';

const Layout = () => {
	return (
		<div className={styles['layout']}>
			<Sidebar />
			<main className={styles['main']}>
				<Outlet />
			</main>
		</div>

		// <div className={styles['layout']}>
		// 	<Header />
		// 	<main className={styles['main']}>
		// 		<div className={styles['container']}>
		// 			<Outlet />
		// 		</div>
		// 	</main>
		// </div>
	);
};

export default Layout;

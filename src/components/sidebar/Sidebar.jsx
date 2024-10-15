import { FaChevronRight } from 'react-icons/fa';
import Header from './header/Header';
import styles from './sidebar.module.css';
import cn from 'classnames';
import { createContext, useState } from 'react';
import MenuLinks from './menuLinks/MenuLinks';

export const SidebarContext = createContext();

export const Sidebar = () => {
	const [sidebarVisible, setSidebarVisible] = useState(false);
	return (
		<SidebarContext.Provider value={{ sidebarVisible, setSidebarVisible }}>
			<div
				className={cn(styles['sidebar'], {
					[styles['visible']]: sidebarVisible
				})}
			>
				<div
					className={styles['overlay']}
					onClick={() => setSidebarVisible(false)}
				></div>
				<nav className={styles['menu']}>
					<div
						className={styles['toggle']}
						onClick={() => setSidebarVisible(prev => !prev)}
					>
						<FaChevronRight />
					</div>
					<Header sidebarVisible={sidebarVisible} />
					<MenuLinks
						sidebarVisible={sidebarVisible}
						setSidebarVisible={setSidebarVisible}
					/>
				</nav>
			</div>
		</SidebarContext.Provider>
	);
};

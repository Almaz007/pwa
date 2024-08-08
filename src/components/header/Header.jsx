import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import cn from 'classnames';

const Header = () => {
	return (
		<header className={styles['header']}>
			<div className={styles['header__row']}>
				<div className={styles['header__logo']}>Bluetooth App</div>
				<nav className={styles['navigaton']}>
					<ul className={styles['nav__row']}>
						<li>
							<NavLink
								to={'/'}
								className={({ isActive }) =>
									cn(styles['link'], {
										[styles['active']]: isActive
									})
								}
							>
								Терминал
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/task'}
								className={({ isActive }) =>
									cn(styles['link'], {
										[styles['active']]: isActive
									})
								}
							>
								Задача
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;

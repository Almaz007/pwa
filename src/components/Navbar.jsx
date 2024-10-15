import cn from 'classnames';
import styles from './navbar.module.css';
import { NavLink } from 'react-router-dom';
import { links } from '../../router/links';

const Navbar = ({ setVisible }) => {
	return (
		<nav className={styles['nav']}>
			<ul className={styles['links']}>
				{links.map(link => (
					<li key={link.id} onClick={() => setVisible(false)}>
						<NavLink
							to={link.path}
							className={({ isActive }) =>
								cn(styles['link'], { [styles['active__link']]: isActive })
							}
						>
							{link.text}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navbar;

import { NavLink } from 'react-router-dom';
import styles from './subMenu.module.css';
import cn from 'classnames';

const SubMenu = ({ subMenuShow, links, handleClick }) => {
	return (
		<ul
			className={cn(styles['sub__menu'], {
				[styles['show']]: subMenuShow
			})}
		>
			<div className={styles['menu']}>
				{links.map((link, index) => (
					<NavLink
						key={index}
						className={({ isActive }) =>
							cn(styles['sub__link'], {
								[styles['active']]: isActive
							})
						}
						to={link.path}
						// onClick={handleClick}
					>
						{link.text}
					</NavLink>
				))}
			</div>
		</ul>
	);
};

export default SubMenu;

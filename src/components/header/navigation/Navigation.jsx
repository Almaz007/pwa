import { NavLink, useMatch } from 'react-router-dom';
import styles from './Navigation.module.css';
import { links } from '../../../router/links';
import cn from 'classnames';
const Navigation = () => {
	return (
		<nav className={styles['navigation']}>
			<ul className={styles.nav__list}>
				{links.map((link, index) => (
					<li key={index} className={styles['link_item']}>
						<NavLink
							className={({ isActive }) =>
								cn(styles['publicLink'], {
									[styles['active']]: isActive
								})
							}
							to={link.path}
							onClick={!!link.links ? e => e.preventDefault() : ''}
						>
							{link.text}
						</NavLink>

						{link.links && (
							<div className={styles['tooltip']}>
								{link.links.map(link => (
									<NavLink
										key={link.id}
										to={link.path}
										className={({ isActive }) =>
											isActive
												? [styles['tooltip__link'], styles['active']].join(' ')
												: styles['tooltip__link']
										}
									>
										{link.text}
									</NavLink>
								))}
							</div>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;

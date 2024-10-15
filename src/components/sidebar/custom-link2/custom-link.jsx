import { NavLink } from 'react-router-dom';
import styles from './custom-link.module.css';
import { SidebarContext } from '../Sidebar';
import { useContext } from 'react';
import cn from 'classnames';
import { FaChevronDown } from 'react-icons/fa';
import { useMatch, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function CustomLink({ path, text, Icon, handleClick, links }) {
	let match = useMatch(path);
	const [showSubMenu, setShowSubMenu] = useState(false);
	const pathname = useLocation().pathname;

	if (links) {
		links.forEach(link => {
			if (pathname.includes(link.path)) {
				match = true;
			}
		});
	}

	const { sidebarVisible } = useContext(SidebarContext);
	return (
		<li
			className={cn(styles['nav-li'], {
				[styles['visible']]: sidebarVisible
			})}
		>
			<div
				className={cn(styles['link__row'], {
					[styles['active']]: match
				})}
				onClick={links ? () => setShowSubMenu(prev => !prev) : handleClick}
			>
				<NavLink to={path ?? '#'} className={styles['link']}>
					<div className={[styles['icon-block']].join(' ')}>
						<Icon />
					</div>
					<span className={styles['text']}>{text}</span>
				</NavLink>
				{links && (
					<div
						className={cn(styles['chevrone__icon'], {
							[styles['show']]: showSubMenu
						})}
					>
						<FaChevronDown />
					</div>
				)}
			</div>

			{links ? (
				<span
					className={cn(styles['tooltip'], {
						[styles['show']]: showSubMenu
					})}
				>
					<div className={styles['links']}>
						{links?.map(link => (
							<NavLink
								to={link.path}
								key={link.id}
								className={({ isActive }) =>
									cn(styles['subMenuLink'], {
										[styles['active']]: isActive
									})
								}
							>
								{link.text}
							</NavLink>
						))}
					</div>
				</span>
			) : (
				<span
					className={cn(styles['tooltip'], {
						[styles['show']]: showSubMenu
					})}
				>
					<div className={styles['subMenuLink']}>{text}</div>
				</span>
			)}
		</li>
	);
}

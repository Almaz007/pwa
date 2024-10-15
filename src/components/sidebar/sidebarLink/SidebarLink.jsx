import { Link, NavLink, useMatch } from 'react-router-dom';
import styles from './sidebarLink.module.css';
import { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../Sidebar';
import { FaChevronDown } from 'react-icons/fa';
import cn from 'classnames';
import SubMenu from '../subMenu/subMenu/SubMenu';

export default function SidebarLink({ path, text, Icon, handleClick, links }) {
	const { sidebarVisible } = useContext(SidebarContext);
	const [subMenuShow, setSubMenuShow] = useState(false);

	const match = useMatch(path ?? 'none');

	useEffect(() => {
		if (!sidebarVisible) {
			setSubMenuShow(false);
		}
	}, [sidebarVisible]);

	const handleVisibleSubMenu = () => {
		if (sidebarVisible) setSubMenuShow(prev => !prev);
	};

	return (
		<li
			className={cn(styles['nav__li'], { [styles['close']]: !sidebarVisible })}
			onClick={links ? handleVisibleSubMenu : handleClick}
		>
			<div className={cn(styles['link__row'])}>
				<NavLink
					to={path}
					className={({ isActive }) =>
						cn(styles['link'], { [styles['active']]: isActive })
					}
					onClick={!!links ? e => e.preventDefault() : ''}
				>
					<div className={[styles['icon__block']].join(' ')}>
						<Icon />
					</div>
					<span className={[styles['text'], styles['nav-text']].join(' ')}>
						{text}
					</span>
				</NavLink>
				{links && (
					<div
						className={cn(styles['chevron__icon'], {
							[styles['show']]: subMenuShow
						})}
					>
						<FaChevronDown />
					</div>
				)}
			</div>

			{links && sidebarVisible && (
				<SubMenu subMenuShow={subMenuShow} links={links} handleClick />
			)}
			{!sidebarVisible && (
				<span className={cn(styles['tooltip'])}>
					<div className={styles['links']}>{text}</div>
				</span>
			)}
		</li>
	);
}

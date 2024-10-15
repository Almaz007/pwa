import styles from './menuLinks.module.css';
import { links } from '../../../router/links';
import cn from 'classnames';
import SidebarLink from '../sidebarLink/SidebarLink';

export default function MenuLinks({ sidebarVisible, setSidebarVisible }) {
	return (
		<ul
			className={cn(styles['menu__links'], {
				[styles['visible']]: sidebarVisible
			})}
		>
			{links.map(link => (
				<SidebarLink
					key={link.id}
					path={link.path}
					text={link.text}
					Icon={link.icon}
					links={link.links}
					handleClick={() => setSidebarVisible(false)}
				/>
			))}
		</ul>
	);
}

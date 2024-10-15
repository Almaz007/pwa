import { NavLink } from 'react-router-dom'
import styles from './Navigation.module.css'
import { publicLinks } from '../../../../routes/publicLinks'
import { useContext } from 'react'
import { ContextForHeader } from '../Header'

const Navigation = () => {
	const { showNav, setShowNav } = useContext(ContextForHeader)

	return (
		<nav className={`${styles['navigation']} ${showNav ? styles['open'] : ''}`}>
			<ul className={styles.nav__list}>
				{publicLinks.map((link, index) => (
					<li key={index}>
						<NavLink
							className={({ isActive }) =>
								isActive
									? [styles['publicLink'], styles['active']].join(' ')
									: styles['publicLink']
							}
							to={link.path}
							onClick={() => setShowNav(!showNav)}
						>
							{link.linkName}
						</NavLink>
					</li>
				))}
			</ul>
			<button
				className={styles.navigation__burger__btn}
				onClick={() => setShowNav(!showNav)}
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</nav>
	)
}

export default Navigation

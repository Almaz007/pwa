import styles from './header.module.css';
import cn from 'classnames';

export default function Header({ sidebarVisible }) {
	return (
		<header className={sidebarVisible ? styles['visible'] : ''}>
			<div className={styles['profile']}>
				<div className={styles['image']}>
					{sidebarVisible ? (
						<img
							src='/headerLogoFull.png'
							alt='avatar'
							className={cn(styles['imgFull'], {
								[styles['invisible']]: !sidebarVisible
							})}
						/>
					) : (
						<img
							src='/headerLogoMini.jpg'
							alt='avatar'
							className={cn(styles['imgMini'], {
								[styles['invisible']]: sidebarVisible
							})}
						/>
					)}
				</div>
				{/* <div className={styles['profile-text']}>PromEnergo</div> */}
			</div>
		</header>
	);
}

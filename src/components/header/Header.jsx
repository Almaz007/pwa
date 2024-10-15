import Navigation from './navigation/Navigation';
import styles from './Header.module.css';

const Header = () => {
	return (
		<header className={styles['header']}>
			<div className='container'>
				<div className={styles.header__block}>
					<div className={styles.header__logo}>
						{/* <Link to='/'>logo</Link> */}
						<img src='./headerLogo.png' alt='' />
					</div>

					<div className={styles.header__action}>
						<Navigation />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;

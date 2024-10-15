import { useState, createContext, useContext } from 'react';

import Navigation from './navigation/Navigation';
import MyButton from '../button/MyButton';
import MyModal from '../MyModal/MyModal';
import RegistrationLoginForm from '../../RegistrationLoginForm/RegistrationLoginForm';
import { authState } from '../../../store/store';
import DropDownProfile from '../../DropDownProfile/DropDownProfile';
import styles from './Header.module.css';
import HeaderLogo from './HeaderLogo';

export const ContextForHeader = createContext();

const Header = () => {
	const [showModal, setShowModal] = useState(false);
	const [showNav, setShowNav] = useState(false);
	const isAuth = authState(state => state.isAuth);

	return (
		<ContextForHeader.Provider value={{ setShowModal, showNav, setShowNav }}>
			<header className={styles['header']}>
				<div className='container'>
					<div className={styles.header__block}>
						<div className={styles.header__logo}>
							{/* <Link to='/'>logo</Link> */}
							<HeaderLogo className={styles['logo']} />
						</div>

						<div className={styles.header__action}>
							<Navigation />

							{isAuth ? (
								<DropDownProfile />
							) : (
								<MyButton onClick={() => setShowModal(true)}>Войти</MyButton>
							)}
						</div>
					</div>
				</div>
				<MyModal visible={showModal} setVisible={setShowModal}>
					<RegistrationLoginForm />
				</MyModal>
			</header>
		</ContextForHeader.Provider>
	);
};

export default Header;

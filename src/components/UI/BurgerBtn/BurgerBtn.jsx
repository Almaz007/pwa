import styles from './BurgerBtn.module.css';
import { useState } from 'react';
import cn from 'classnames';

const BurgerBtn = ({ visible, setVisible }) => {
	return (
		<button
			className={cn(styles['menu__btn'], {
				[styles['visible']]: visible
			})}
			onClick={() => setVisible(prev => !prev)}
		>
			<span></span>
			<span></span>
			<span></span>
		</button>
	);
};

export default BurgerBtn;

import { useState } from 'react';
import styles from './sendForm.module.css';
import { IoSendSharp } from 'react-icons/io5';

const SendForm = ({ handleClick, text, setText }) => {
	return (
		<form className={styles['send__form']}>
			<input
				type='text'
				value={text}
				onChange={e => setText(e.target.value)}
				className={styles['send__input']}
				placeholder='Type something to send...'
			/>
			<IoSendSharp className={styles['send__btn']} onClick={handleClick} />
		</form>
	);
};

export default SendForm;

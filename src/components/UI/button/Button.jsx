import styles from './button.module.css';
import cn from 'classnames';
const Button = ({ children, handleClick, className }) => {
	return (
		<button onClick={handleClick} className={cn(styles['button'], className)}>
			{children}
		</button>
	);
};

export default Button;

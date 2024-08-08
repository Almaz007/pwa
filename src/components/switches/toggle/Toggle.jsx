import styles from './toggle.module.css';
import cn from 'classnames';

const Toggle = ({ index, binaryValues, handleClick }) => {
	return (
		<div
			key={index}
			className={cn(styles['toggle'], {
				[styles['active']]: !!binaryValues[index]
			})}
			onClick={() => handleClick(index)}
		>
			<div className='switch__value'>{binaryValues[index]}</div>

			<div className={styles['toggle__switch']}></div>
		</div>
	);
};

export default Toggle;

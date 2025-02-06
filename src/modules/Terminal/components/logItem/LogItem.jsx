import cn from 'classnames';
import styles from './logItem.module.css';

const LogItem = ({ log }) => {
	const { message, type } = log;
	return (
		<div
			className={cn(styles['log__text'], {
				[styles[type]]: !!type
			})}
		>
			{message}
		</div>
	);
};

export default LogItem;

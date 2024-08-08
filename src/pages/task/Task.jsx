import Menu from '../../components/menu/Menu';
import Switches from '../../components/switches/Switches';
import styles from './task.module.css';

const Task = () => {
	return (
		<div className={styles['task']}>
			<Switches />
			<Menu />
		</div>
	);
};

export default Task;

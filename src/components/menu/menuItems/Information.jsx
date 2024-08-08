import styles from './menuItems.module.css';

const Information = ({ punkt }) => {
	return <div className={styles['text']}>{punkt.text}</div>;
};

export default Information;

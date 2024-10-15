import styles from './tableLayout.module.css';

const TabeLayout = ({ children, text }) => {
	return (
		<div className={styles['table_block']}>
			<h2 className={styles['table__title']}>{text}</h2>
			{children}
		</div>
	);
};

export default TabeLayout;

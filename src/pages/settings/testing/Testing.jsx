import styles from './testing.module.css';
import { DataGrid } from '@mui/x-data-grid';
import { rows, columns } from './mockData/mockData';

const Testing = () => {
	return (
		<div className={styles['table_block']}>
			<h2 className={styles['table__title']}>Тестирование Мастера</h2>
			<DataGrid rows={rows} columns={columns} hideFooter />
		</div>
	);
};

export default Testing;

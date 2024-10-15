import { DataGrid } from '@mui/x-data-grid';
import { rows, columns } from './mockData/mockData';
import styles from './maximetrs.module.css';

const Maximeters = () => {
	return (
		<div className={styles['table_block']}>
			<h2 className={styles['table__title']}>Максиметры</h2>
			<DataGrid rows={rows} columns={columns} hideFooter />
		</div>
	);
};

export default Maximeters;

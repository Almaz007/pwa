import { DataGrid } from '@mui/x-data-grid';
import { rows, columns } from './mockData/mockData';
import styles from './accidentLog.module.css';

const AccidentLog = () => {
	return (
		<div className={styles['table_block']}>
			<h2 className={styles['table__title']}>Журнал аварий </h2>
			<DataGrid rows={rows} columns={columns} hideFooter />
		</div>
	);
};

export default AccidentLog;

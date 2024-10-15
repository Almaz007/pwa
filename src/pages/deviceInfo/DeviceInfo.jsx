import styles from './deviceInfo.module.css';
import { DataGrid } from '@mui/x-data-grid';
import { rows, columns } from './mockData/mockData';

const DeviceInfo = () => {
	return (
		<div className={styles['table_block']}>
			<h2 className={styles['table__title']}>Информация об устройстве</h2>
			<DataGrid rows={rows} columns={columns} hideFooter hideColumnHeaders />;
		</div>
	);
};

export default DeviceInfo;

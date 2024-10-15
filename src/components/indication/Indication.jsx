import { DataGrid } from '@mui/x-data-grid';
import { rows, columns } from './mockData/mockData';

const Indication = () => {
	return <DataGrid rows={rows} columns={columns} hideFooter />;
};

export default Indication;

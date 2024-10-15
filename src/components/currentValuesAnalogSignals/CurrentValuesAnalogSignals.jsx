import { DataGrid } from '@mui/x-data-grid';
import { columns, rows } from './mockData/mockData';
const CurrentValuesAnalogSignals = () => {
	return <DataGrid rows={rows} columns={columns} hideFooter />;
};

export default CurrentValuesAnalogSignals;

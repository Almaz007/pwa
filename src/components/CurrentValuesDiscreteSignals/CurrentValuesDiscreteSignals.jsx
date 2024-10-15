import styles from './currentValuesDiscreteSignals.module.css';
import { rows, columns } from './mockData/mockData';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

const CurrentValuesDiscreteSignals = () => {
	const [rowsForTable, setRowsForTable] = useState(rows);
	const handleCheckboxChange = id => {
		setRowsForTable(prevRows =>
			prevRows.map(row => (row.id === id ? { ...row, value: !row.value } : row))
		);
	};

	return (
		<div>
			<DataGrid
				rows={rowsForTable}
				columns={columns(handleCheckboxChange)}
				disableRowSelectionOnClick
				hideFooterPagination
				hideFooterSelectedRowCount
				hideFooter
				pageSize={false}
			/>
		</div>
	);
};

export default CurrentValuesDiscreteSignals;

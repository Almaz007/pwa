export const rows = [
	{
		id: 1,
		name: 'Bluetooth',
		value: '',
		note: ''
	},
	{
		id: 2,
		name: 'Имя',
		value: '',
		note: '15 знаков'
	},
	{
		id: 3,
		name: 'Тайм-аут отключения,мин',
		value: 0,
		note: 'Диапазон от 0-720'
	}
];

export const columns = [
	{ field: 'name', headerName: 'Наименование параметра', width: 250 },
	{
		field: 'value',
		headerName: 'Значение',
		width: 250
	},
	{ field: 'note', headerName: 'примечание', width: 250 }
];

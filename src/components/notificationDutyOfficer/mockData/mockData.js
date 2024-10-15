export const rows = [
	{
		id: 1,
		name: 'Оповещение по SMS',
		value: true,
		note: ''
	},
	{
		id: 2,
		name: 'Оповещение по звонку',
		value: true,
		note: ''
	},
	{
		id: 3,
		name: 'Номер телефона №1',
		value: '',
		note: ''
	},
	{
		id: 4,
		name: 'Номер телефона №2',
		value: '',
		note: ''
	},
	{
		id: 5,
		name: 'Номер телефона №3',
		value: '',
		note: ''
	}
];

export const columns = [
	{ field: 'name', headerName: 'Наименование параметра', width: 250 },
	{
		field: 'value',
		headerName: 'Значение',
		width: 250,
		renderCell: params => {
			if (typeof params.value === 'boolean') {
				return params.value ? 'Вкл.' : 'Выкл.';
			}
		}
	},
	{ field: 'note', headerName: 'Примечание', width: 250 }
];

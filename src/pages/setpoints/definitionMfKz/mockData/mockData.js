export const rows = [
	{
		id: 1,
		name: 'Ток срабатывания',
		designation: 'Iср',
		value: '500',
		unitMeasure: 'А'
	},
	{
		id: 2,
		name: 'Ограничение по времени протекан ия тока КЗ',
		designation: null,
		value: true,
		unitMeasure: null
	},
	{
		id: 3,
		name: 'Длительность протекания тока КЗ не более',
		designation: 'Tcp',
		value: '6',
		unitMeasure: 'c'
	},
	{
		id: 4,
		name: 'Срабатывание по приращению тока',
		designation: null,
		value: true,
		unitMeasure: null
	},
	{
		id: 5,
		name: 'Ток срабатывания по приращению',
		designation: 'dt/dt',
		value: '100',
		unitMeasure: 'A/c'
	}
];

export const columns = [
	{ field: 'name', headerName: 'Наименование', width: 250 },
	{
		field: 'designation',
		headerName: 'Обозначение',
		width: 250,
		renderCell: params => {
			if (!params.value) {
				return '–';
			}
		}
	},
	{
		field: 'value',
		headerName: 'Значение',
		width: 250,
		renderCell: params => {
			if (typeof params.value === 'boolean') {
				return params.value ? 'вкл' : 'выкл';
			}
		}
	},
	{
		field: 'unitMeasure',
		headerName: 'Единица измерения',
		width: 250,
		renderCell: params => {
			if (!params.value) {
				return '–';
			}
		}
	}
];

export const rows = [
	{
		id: 1,
		name: 'Ток срабатывания 3IO',
		designation: '3IO',
		value: '5',
		unitMeasure: 'А'
	},
	{
		id: 2,
		name: 'Срабатывание по приращению тока',
		designation: null,
		value: true,
		unitMeasure: null
	},
	{
		id: 3,
		name: 'Ток срабатывания по приращению',
		designation: 'dI/dt',
		value: '100',
		unitMeasure: 'А/с'
	},
	{
		id: 4,
		name: 'Падение напряжения',
		designation: 'du/dt',
		value: 50,
		unitMeasure: 'В/с'
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

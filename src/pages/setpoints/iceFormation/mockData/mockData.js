export const rows = [
	{
		id: 1,
		name: 'Уставка наличия гололеда 1 ступень',
		designation: 'ПО Ice 1ст',
		value: '?',
		unitMeasure: ''
	},
	{
		id: 2,
		name: 'Время срабатывания 1 ступени наличия гололеда',
		designation: 'T Ice 1ст',
		value: 60,
		unitMeasure: 'мин'
	},
	{
		id: 3,
		name: 'Уставка наличия гололеда 2 ступень',
		designation: 'ПО Ice 2ст',
		value: '?',
		unitMeasure: ''
	},
	{
		id: 4,
		name: 'Время срабатывания 2 ступени наличия гололеда',
		designation: 'T Ice 2ст',
		value: 60,
		unitMeasure: 'мин'
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

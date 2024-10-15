export const rows = [
	{ id: 1, name: 'Ток ВЛ', designation: 'Iвл', value: '320', unitMeasure: 'A' },
	{
		id: 2,
		name: 'Напряжение фазы ВЛ',
		designation: 'Uвл',
		value: '220',
		unitMeasure: 'B'
	},
	{
		id: 3,
		name: 'Заряд АКБ',
		designation: 'Uакб',
		value: '12.6',
		unitMeasure: 'B'
	},
	{
		id: 4,
		name: 'Температура провода',
		designation: 'Tпр',
		value: '65',
		unitMeasure: '°С'
	},
	{
		id: 5,
		name: 'Уровень обледения',
		designation: 'Ice',
		value: '0.4',
		unitMeasure: 'о.е'
	},
	{
		id: 6,
		name: 'Уровень GSM сигнала',
		designation: 'Level',
		value: '75',
		unitMeasure: 'Дб'
	}
];

export const columns = [
	{ field: 'name', headerName: 'Наименование', width: 250 },
	{ field: 'designation', headerName: 'Обозначение', width: 250 },
	{ field: 'value', headerName: 'Значение', width: 250 },
	{ field: 'unitMeasure', headerName: 'Единица измерения', width: 250 }
];

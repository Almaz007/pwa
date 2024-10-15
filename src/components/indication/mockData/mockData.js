export const rows = [
	{
		id: 1,
		name: 'Ограничение времени индикации',
		value: true,
		unitMeasure: ''
	},
	{
		id: 2,
		name: 'Время сброса аварийной индикации',
		value: 600,
		unitMeasure: 'Мин'
	},
	{
		id: 3,
		name: 'Cъем сигнализации по току',
		value: true,
		unitMeasure: ''
	},
	{
		id: 4,
		name: 'Ток сброса',
		value: 2,
		unitMeasure: 'А'
	},
	{
		id: 5,
		name: 'Дистанционный сброс индикации через SCADA',
		value: true,
		unitMeasure: ''
	}
];

export const columns = [
	{ field: 'name', headerName: 'Наименование', width: 250 },
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
	{ field: 'unitMeasure', headerName: 'Единица измерения', width: 250 }
];

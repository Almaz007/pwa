export const rows = [
	{
		id: 1,
		name: 'Общий адрес ASDU',
		value: '',
		unitMessure: ''
	},
	{
		id: 2,
		name: 'Тайм-аут подтверждения',
		value: '',
		unitMessure: 'мс'
	},
	{
		id: 3,
		name: 'Тайм-аут повторной передачи',
		value: '',
		unitMessure: 'мс'
	},
	{
		id: 4,
		name: 'Тайм-аут разрыва сеанса',
		value: '',
		unitMessure: 'с'
	},
	{
		id: 5,
		name: 'Интервал фонового сканирования',
		value: '',
		unitMessure: 'с'
	},
	{
		id: 6,
		name: 't0',
		value: '',
		unitMessure: 'с'
	},
	{
		id: 7,
		name: 't1',
		value: '',
		unitMessure: 'c'
	},
	{
		id: 8,
		name: 't2',
		value: '',
		unitMessure: 'с'
	},
	{
		id: 9,
		name: 't3',
		value: '',
		unitMessure: 'с'
	},
	{
		id: 10,
		name: 'k',
		value: '',
		unitMessure: ''
	},
	{
		id: 11,
		name: 'w',
		value: '',
		unitMessure: ''
	},
	{
		id: 12,
		name: 'учет часового пояса',
		value: '',
		unitMessure: ''
	},

	{
		id: 13,
		name: 'Флаг спорадической рассылки',
		value: '',
		unitMessure: ''
	},
	{
		id: 14,
		name: 'Аппертура тока',
		value: 10,
		unitMessure: '%'
	},
	{
		id: 15,
		name: 'Аппертура напряжения',
		value: 20,
		unitMessure: '%'
	}
];

export const columns = [
	{ field: 'name', headerName: 'Наименование параметра', width: 250 },
	{
		field: 'value',
		headerName: 'Значение',
		width: 250
	},
	{ field: 'unitMessure', headerName: 'Единица измерения', width: 250 }
];

export const rows = [
	{
		id: 1,
		name: 'Использовать DHCP',
		value: '',
		note: ''
	},
	{
		id: 2,
		name: 'IP адрес',
		value: '',
		note: ''
	},
	{
		id: 3,
		name: 'Маска подсети',
		value: '',
		note: ''
	},
	{
		id: 4,
		name: 'IP адрес SCADA',
		value: '',
		note: ''
	},
	{
		id: 5,
		name: 'Порт SCADA',
		value: '',
		note: ''
	},
	{
		id: 6,
		name: 'APN SIM',
		value: '',
		note: ''
	},
	{
		id: 7,
		name: 'User name SIM',
		value: '',
		note: ''
	},
	{
		id: 8,
		name: 'Password SIM',
		value: '',
		note: ''
	},
	{
		id: 9,
		name: 'APN eSIM',
		value: '',
		note: ''
	},
	{
		id: 10,
		name: 'User name eSIM',
		value: '',
		note: ''
	},
	{
		id: 11,
		name: 'Password eSIM',
		value: '',
		note: ''
	},
	{
		id: 12,
		name: 'Режим работы модема',
		value: 'Авто',
		note: ''
	},
	{
		id: 13,
		name: 'Время ожижания ответа',
		value: '2-10 сек',
		note: 'После истечения времени необходимо выполнить рестарт'
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

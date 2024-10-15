import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { api } from '../shared/api';
import Papa from 'papaparse';

export const useBluetoothState = create((set, get) => ({
	device: null,
	characteristic: null,
	logs: [],
	uiids: {
		serviceUuid: '170ea494-cb37-4351-8361-40b0b6e3a308',
		characteristicUuid: '8374dda7-30aa-441a-93c0-327f5333b042'
	},

	addLog: (message, type = '') => {
		const { logs } = get();
		const newMessage = { id: uuidv4(), message, type };

		set({ logs: [...logs, newMessage] });
	},
	boundHandleCharacteristicValueChanged: event => {
		const { addLog } = get();
		const value = new TextDecoder().decode(event.target.value);

		addLog(value, 'in');
	},
	boundHandleDisconnection: () => {
		const { device, addLog, connectDeviceAndCacheCharacteristic } = get();
		addLog(
			`"${device.name}"  bluetooth device disconnected, trying to reconnect...`
		);

		connectDeviceAndCacheCharacteristic();
	},

	requestBluetoothDevice: async () => {
		const { addLog, boundHandleDisconnection } = get();

		addLog('Requesting bluetooth device...');
		const device = await navigator.bluetooth.requestDevice({
			filters: [
				{
					namePrefix: 'realme'
				}
			],
			optionalServices: ['170ea494-cb37-4351-8361-40b0b6e3a308']
		});

		addLog(`${device.name} bluetooth device selected`);
		device.addEventListener('gattserverdisconnected', boundHandleDisconnection);
		set({ device }); // Remember device.
	},
	connectDeviceAndCacheCharacteristic: async () => {
		const { uiids, addLog, device } = get();

		addLog('Connecting to GATT server...');
		const server = await device.gatt.connect();

		addLog('GATT server connected, getting service...');
		const service = await server.getPrimaryService(uiids.serviceUuid);

		addLog('Service found, getting characteristic...');
		const characteristic = await service.getCharacteristic(
			uiids.characteristicUuid
		);

		addLog('Characteristic found');
		set({ characteristic });
	},
	startNotifications: async () => {
		const { addLog, characteristic, boundHandleCharacteristicValueChanged } =
			get();

		addLog('Starting notifications...');
		await characteristic.startNotifications();
		addLog('Notifications started');

		characteristic.addEventListener(
			'characteristicvaluechanged',
			boundHandleCharacteristicValueChanged
		);
	},

	connect: async () => {
		const {
			addLog,
			requestBluetoothDevice,
			connectDeviceAndCacheCharacteristic,
			startNotifications
		} = get();

		try {
			await requestBluetoothDevice();
			await connectDeviceAndCacheCharacteristic();
			await startNotifications();
		} catch (err) {
			addLog(`Error: ${err.message}`, 'err');
		}
	},
	disconnectFromDevice: () => {
		const { addLog, device, boundHandleDisconnection } = get();

		if (!device) return;

		device.removeEventListener(
			'gattserverdisconnected',
			boundHandleDisconnection
		);

		addLog(`Disconnecting from "${device.name}" bluetooth device...`);

		if (!device.gatt.connected) {
			addLog(`"${device.name}" bluetooth device is already disconnected`);
			return;
		}
		device.gatt.disconnect();

		addLog(`"${device.name}" bluetooth device disconnected`);
	},
	disconnect: () => {
		const {
			disconnectFromDevice,
			characteristic,
			boundHandleCharacteristicValueChanged
		} = get();

		disconnectFromDevice();

		if (characteristic) {
			characteristic.removeEventListener(
				'characteristicvaluechanged',
				boundHandleCharacteristicValueChanged
			);
		}

		set({ device: null, characteristic: null });
	}
}));

export const useMenu = create((set, get) => ({
	historyChoices: [],
	errMessage: '',

	fetchHistoryChoices: async () => {
		try {
			const historyChoices = await api.getHistoryChoices();

			set({ historyChoices });
		} catch (err) {
			set({ errMessage: err.message });
		}
	},
	addHistoryChoice: async text => {
		const { historyChoices } = get();

		try {
			const res = await api.addChoice({ punkt: text });
			set({ historyChoices: [...historyChoices, res] });
		} catch (err) {
			set({ errMessage: err.message });
		}
	},
	portConnect: async cb => {
		const port = await navigator.serial.requestPort();
		await port.open({ baudRate: 9600 });

		const textDecoder = new TextDecoderStream();
		const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
		const reader = textDecoder.readable.getReader();

		console.log('успешно');
		// Listen to data coming from the serial device.
		while (port.readable) {
			try {
				while (true) {
					const { value, done } = await reader.read();
					if (done) {
						// Allow the serial port to be closed later.
						reader.releaseLock();
						break;
					}
					if (value) {
						console.log(value);
						cb(value);
					}
				}
			} catch (err) {
				console.log(err);
			}
		}
	},

	backToHistoryChoices: async () => {
		const { historyChoices } = get();
		console.log(historyChoices);

		try {
			const choiceId = historyChoices[historyChoices.length - 1]?.id;
			if (!choiceId) throw new Error('пусто');

			const res = await api.removeChoiceById(choiceId);
			console.log(res);

			set({
				historyChoices: historyChoices.filter(choice => choice.id !== choiceId),
				errMessage: ''
			});
		} catch (err) {
			console.log(err);
			set({ errMessage: err.message });
		}
	}
}));

export const useOscilogramms = create((set, get) => ({
	cfgData: {},
	cfgDataLoad: false,
	cfgError: '',
	cfgLoaded: false,

	sginalsData: {},
	signalDataLoad: false,
	signalDataError: '',
	signalsLoaded: false,

	chartsData: [],

	handleCfgFile: event => {
		const file = event.target.files[0];
		const reader = new FileReader();
		let decoder = new TextDecoder('windows-1251');

		reader.readAsArrayBuffer(file);

		reader.onload = function () {
			const text = decoder.decode(reader.result).split('\r\n');
			const cfgData = {};

			const countsData = text[1].split(',');

			cfgData['countsInfo'] = {
				total: +countsData[0],
				analogueChannelsCount: +countsData[1]?.slice(0, -1),
				discreteChannelsCount: +countsData[2]?.slice(0, -1)
			};
			console.log(cfgData);

			const channelsData = text.slice(2, 2 + cfgData.countsInfo.total);
			const { analogueChannelsCount, discreteChannelsCount } =
				cfgData.countsInfo;

			cfgData['channelsData'] = {
				analogueChannels: channelsData.slice(0, analogueChannelsCount),
				discreteChannels: channelsData.slice(analogueChannelsCount)
			};

			set({
				cfgData: { fileName: file.name, ...cfgData },
				cfgLoaded: true
			});
		};

		reader.onerror = function () {
			set({ cfgError: reader.error });

			console.log(reader.error);
		};
	},
	handleDataFile: event => {
		const file = event.target.files[0];

		Papa.parse(file, {
			header: false,
			dynamicTyping: true,
			complete: function (results) {
				console.log('Parsed CSV data:', results.data);

				set({
					sginalsData: {
						fileName: file.name,
						signals: results.data
					},
					signalsLoaded: true
				});
			},
			error: function (error) {
				set({ signalDataError: error, signalsLoaded: false });
				console.error('Error parsing CSV:', error);
			}
		});
	},
	generateChartsData: () => {
		const {
			cfgData,
			sginalsData: { signals }
		} = get();
		const { discreteChannels, analogueChannels } = cfgData.channelsData;
		const { analogueChannelsCount } = cfgData.countsInfo;

		const chartsData = [];
		[...analogueChannels, ...discreteChannels].map((chanel, index) => {
			let [number, id] = chanel.split(',');
			index = index + 2;
			const xyData = signals.map(signal => ({
				x: signal[1],
				y: signal[index]
			}));
			// const xyData = signals.reduce(
			// 	(acc, signal) => {
			// 		acc['xData'].push(signal[1]);
			// 		acc['yData'].push(signal[index]);
			// 		return acc;
			// 	},
			// 	{ xData: [], yData: [] }
			// );

			const dataForChannel = {
				name: id,
				id: id + ' ' + number,
				xyData,
				visible: true
			};

			chartsData.push(dataForChannel);
		});

		console.log(chartsData);
		set({
			chartsData: chartsData
		});
	},
	visibilityControl: chartId => {
		const { chartsData } = get();
		const newChartsData = [...chartsData];

		newChartsData.forEach(item => {
			if (item.id === chartId) {
				console.log('найден');
				item.visible = !item.visible;
			}
		});

		set({ chartsData: newChartsData });
	}
}));

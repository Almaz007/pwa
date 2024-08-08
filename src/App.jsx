import { useState } from 'react';
import Header from './components/header/Header';
import Terminal from './components/terminal/Terminal';
import { v4 as uuidv4 } from 'uuid';
import SendForm from './components/sendForm/SendForm';

function App() {
	const [uiids, setUiids] = useState({
		serviceUuid: '170ea494-cb37-4351-8361-40b0b6e3a308',
		characteristicUuid: '8374dda7-30aa-441a-93c0-327f5333b042'
	});

	const [device, setDevice] = useState(null);
	const [characteristic, setCharacteristic] = useState(null);
	const [logs, setLogs] = useState([]);

	const clearTerminal = () => {
		setLogs([]);
	};

	const disconnectFromDevice = async () => {
		console.log(device);
		if (!device) {
			return;
		}

		log(`Disconnecting from "${device.name}" bluetooth device...`);

		device.removeEventListener(
			'ongattserverdisconnected',
			boundHandleDisconnection
		);

		if (!device.gatt.connected) {
			log(`"${device.name}" bluetooth device is already disconnected`);
			return;
		}

		await device.gatt.disconnect();

		log(`"${device.name}" bluetooth device disconnected`);
	};
	const disconnect = async () => {
		try {
			await disconnectFromDevice();

			if (characteristic) {
				characteristic.removeEventListener(
					'oncharacteristicvaluechanged',
					boundHandleCharacteristicValueChanged
				);
				setCharacteristic(null);
			}

			setDevice(null);
		} catch (err) {
			log(`Error: ${err}`, 'err');
		}
	};

	const boundHandleDisconnection = async event => {
		const device = event.target;
		console.log('handle disconnection');
		log(
			`"${device.name}" bluetooth device disconnected, trying to reconnect...`
		);
		try {
			const characteristic = await connectDeviceAndCacheCharacteristic(device);
			await startNotifications(characteristic);
		} catch (error) {
			log(`Error: ${error}`, 'err');
		}
	};

	const boundHandleCharacteristicValueChanged = event => {
		console.log('changee characteristik');
		const value = new TextDecoder().decode(event.target.value);
		console.log(value);
	};

	const log = (message, type = '') => {
		setLogs(prev => [...prev, { id: uuidv4(), message, type }]);
	};

	const requestBluetoothDevice = async () => {
		log('Requesting bluetooth device...');

		if (navigator.bluetooth) {
			this._log({
				messages: ['Web Bluetooth  поддерживается в этом браузере.']
			});

			return Promise.reject({
				messages: 'Web Bluetooth  поддерживается в этом браузере.'
			});
		}

		const device = await navigator.bluetooth.requestDevice({
			filters: [
				{
					namePrefix: 'realme'
				}
			],
			optionalServices: ['170ea494-cb37-4351-8361-40b0b6e3a308']
		});

		log(`${device.name} bluetooth device selected`);

		setDevice(device);
		device.addEventListener('gattserverdisconnected', boundHandleDisconnection);

		console.log(device);

		return device;
	};

	const connectDeviceAndCacheCharacteristic = async device => {
		log('Connecting to GATT server...');

		const server = await device.gatt.connect();
		console.log(server);
		log('GATT server connected, getting service...');

		const service = await server.getPrimaryService(uiids.serviceUuid);
		console.log(service);
		log('Service found, getting characteristic...');

		const characteristic = await service.getCharacteristic(
			uiids.characteristicUuid
		);
		console.log(characteristic);

		log('Characteristic found');
		setCharacteristic(characteristic);

		return characteristic;
	};

	const startNotifications = async characteristic => {
		log('Starting notifications...');

		await characteristic.startNotifications();
		log('Notifications started');

		console.log(characteristic);

		characteristic.addEventListener(
			'oncharacteristicvaluechanged',
			boundHandleCharacteristicValueChanged
		);
	};

	const connect = async () => {
		try {
			const device = await requestBluetoothDevice();
			const characteristic = await connectDeviceAndCacheCharacteristic(device);
			await startNotifications(characteristic);
		} catch (error) {
			log(`Error: ${error}`, 'err');
		}
	};

	return (
		<div className='app'>
			<Header
				connect={connect}
				clearTerminal={clearTerminal}
				disconnect={disconnect}
			/>
			<Terminal logs={logs} />
			<SendForm />
		</div>
	);
}

export default App;

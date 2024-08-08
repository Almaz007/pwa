import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
	device: null,
	characteristic: null,
	logs: [],
	uiids: {
		serviceUuid: '170ea494-cb37-4351-8361-40b0b6e3a308',
		characteristicUuid: '8374dda7-30aa-441a-93c0-327f5333b042'
	}
};

export const requestBluetoothDevice = createAsyncThunk(
	'bluetooth/requestBluetoothDevice',
	async function (_, { rejectWithValue, dispatch }) {
		try {
			const device = await navigator.bluetooth.requestDevice({
				filters: [
					{
						namePrefix: 'realme'
					}
				],
				optionalServices: ['170ea494-cb37-4351-8361-40b0b6e3a308']
			});
			// dispatch(setDevice(device));
			return device;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const connectDeviceAndCacheCharacteristic = createAsyncThunk(
	'bluetooth/connectDeviceAndCacheCharacteristic',
	async function (_, { dispatch, getState, rejectWithValue }) {
		const { device, uiids } = getState();
		try {
			dispatch(addLog(createMessage('Connecting to GATT server...')));
			const server = await device.gatt.connect();

			dispatch(
				addLog(createMessage('GATT server connected, getting service...'))
			);
			const service = await server.getPrimaryService(uiids.serviceUuid);

			dispatch(
				addLog(createMessage('Service found, getting characteristic...'))
			);
			const characteristic = await service.getCharacteristic(
				uiids.characteristicUuid
			);

			dispatch(addLog(createMessage('Characteristic found')));
			return characteristic;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);
const createMessage = (message, type = '') => {
	return { id: uuidv4(), message, type };
};

const bluetoothSlice = createSlice({
	name: 'bluetooth',
	initialState: initialState,
	reducers: {
		addLog: (state, action) => {
			state.logs.push(action.payload);
		},
		setDevice: (state, action) => {
			state.device = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(requestBluetoothDevice.pending, state => {
			state.logs.push(createMessage('Requesting bluetooth device...'));
		});
		builder.addCase(requestBluetoothDevice.fulfilled, (state, action) => {
			const device = action.payload;
			state.logs.push(
				createMessage(`${device.name} bluetooth device selected`)
			);

			device.addEventListener(
				'gattserverdisconnected',
				boundHandleDisconnection
			);

			state.device = device;
			// return { ...device };
			// console.log(state.device);
			// connectDeviceAndCacheCharacteristic();
		});
		builder.addCase(requestBluetoothDevice.rejected, (state, action) => {
			state.logs.push(createMessage(`Error: ${action.payload}`, 'err'));
		});
		builder.addCase(
			connectDeviceAndCacheCharacteristic.fulfilled,
			(state, action) => {
				state.characteristic = action.payload;
			}
		);
		builder.addCase(
			connectDeviceAndCacheCharacteristic.rejected,
			(state, action) => {
				state.logs.push(createMessage(`Error: ${action.payload}`, 'err'));
			}
		);
	}
});

export default bluetoothSlice.reducer;
export const { addLog, setDevice } = bluetoothSlice.actions;

// Функция-обработчик события отключения
function boundHandleDisconnection(event) {
	const device = event.target;
	console.log(`Устройство ${device.name} отключено.`);
	// Добавьте любую дополнительную логику обработки отключения здесь
}

import { configureStore } from '@reduxjs/toolkit';
import bluetoothReducer from './bluetoothSlice';

export const store = configureStore({
	reducer: {
		bluetooth: bluetoothReducer
	}
});

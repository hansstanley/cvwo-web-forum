import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { RootState } from '../../app/store';

export interface Snack {
	key?: string;
	message: string;
	severity: AlertColor;
}

interface SnacksState {
	snackPack: Snack[];
}

const initialState: SnacksState = {
	snackPack: [],
};

const snacksSlice = createSlice({
	name: 'snacks',
	initialState,
	reducers: {
		pushSnack: (state, action: PayloadAction<Snack>) => {
			state.snackPack.push({ ...action.payload, key: dayjs().toISOString() });
		},
		popSnack: (state) => {
			state.snackPack = state.snackPack.slice(1);
		},
	},
});

export const { pushSnack, popSnack } = snacksSlice.actions;

export const selectSnacks = (state: RootState) => state.snacks.snackPack;

export const selectTopSnack = (state: RootState) =>
	state.snacks.snackPack.length > 0 ? state.snacks.snackPack[0] : null;

export default snacksSlice.reducer;

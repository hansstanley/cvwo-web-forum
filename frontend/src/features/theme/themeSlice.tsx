import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
	mode: ThemeMode;
	mobile: boolean;
}

const initialState: ThemeState = {
	mode: 'dark',
	mobile: false,
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleMode: (state, action: PayloadAction<ThemeMode>) => {
			state.mode = action.payload;
		},
		setMobile: (state, action: PayloadAction<boolean>) => {
			state.mobile = action.payload;
		},
	},
});

export const { toggleMode, setMobile } = themeSlice.actions;

export const selectLightMode = (state: RootState) =>
	state.theme.mode === 'light';

export const selectMobile = (state: RootState) => state.theme.mobile;

export default themeSlice.reducer;

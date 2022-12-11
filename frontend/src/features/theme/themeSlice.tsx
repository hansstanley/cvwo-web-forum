import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
	mode: ThemeMode;
}

const initialState: ThemeState = {
	mode: 'dark',
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleMode: (state, action: PayloadAction<ThemeMode>) => {
			state.mode = action.payload;
		},
	},
});

export const { toggleMode } = themeSlice.actions;

export default themeSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UserState {
	loading: boolean;
	success: boolean;
	userInfo?: User;
	userToken?: string;
}

const initialState: UserState = {
	loading: false,
	success: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		onLoginStart: (state) => {
			state.loading = true;
			state.success = false;
		},
		onLoginSuccess: (state, action: PayloadAction<User>) => {
			state.loading = false;
			state.success = true;
			state.userInfo = action.payload;
		},
		onLoginFailure: (state) => {
			state.loading = false;
			state.success = false;
			state.userInfo = undefined;
			state.userToken = undefined;
		},
		onLogout: (state) => {
			state.success = false;
			state.userInfo = undefined;
			state.userToken = undefined;
		},
	},
});

export const { onLoginStart, onLoginSuccess, onLoginFailure, onLogout } =
	userSlice.actions;

export default userSlice.reducer;

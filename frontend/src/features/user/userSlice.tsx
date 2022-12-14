import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';
import { FetchStatus } from '../../types/common';
import { handleUserLogin } from './userApi';

interface UserState {
	status: FetchStatus;
	userInfo?: User;
	userToken?: string;
}

const initialState: UserState = {
	status: { status: 'idle' },
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		onLogout: (state) => {
			return { status: { status: 'idle' } };
		},
	},
	extraReducers(builder) {
		builder
			.addCase(handleUserLogin.pending, (state, action) => {
				state.status = { status: 'loading', errorMessage: undefined };
			})
			.addCase(handleUserLogin.fulfilled, (state, action) => {
				state.status = { status: 'success', errorMessage: undefined };
				state.userInfo = action.payload;
			})
			.addCase(handleUserLogin.rejected, (state, action) => {
				state.status = {
					status: 'failure',
					errorMessage: action.error.message,
				};
				state.userInfo = undefined;
			});
	},
});

export const { onLogout } = userSlice.actions;

export default userSlice.reducer;

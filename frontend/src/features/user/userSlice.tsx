import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { User } from '../../types/user';
import { FetchStatus } from '../../types/common';
import { fetchUserByUsername, handleUserLogin } from './userApi';

interface UserState {
	status: FetchStatus;
	userInfo?: User;
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
				return { status: { status: 'loading' } };
			})
			.addCase(handleUserLogin.fulfilled, (state, action) => {
				return { status: { status: 'loading' }, auth: action.payload };
			})
			.addCase(handleUserLogin.rejected, (state, action) => {
				return {
					status: {
						status: 'failure',
						errorMessage: action.error.message,
					},
				};
			});
		builder
			.addCase(fetchUserByUsername.fulfilled, (state, action) => {
				state.status = { status: 'success' };
				state.userInfo = action.payload;
			})
			.addCase(fetchUserByUsername.rejected, (state, action) => {
				state.status = {
					status: 'failure',
					errorMessage: action.error.message,
				};
				state.userInfo = undefined;
			});
	},
});

export const { onLogout } = userSlice.actions;

export const selectLoginSuccess: (state: RootState) => boolean = (state) =>
	state.user.status.status === 'success';

export const selectUser = (state: RootState) => state.user.userInfo;

export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getAuth, setAuth } from '../../app/utils';
import { AuthResponse } from '../../types/user';
import { handleUserLogin } from '../user/userApi';

interface AuthState {
	auth?: AuthResponse;
}

const initialState: AuthState = {};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		initAuth: (state) => {
			state.auth = getAuth();
		},
		resetAuth: (state) => {
			setAuth(undefined);
			return { auth: undefined };
		},
	},
	extraReducers(builder) {
		builder.addCase(handleUserLogin.fulfilled, (state, action) => {
			return { auth: action.payload };
		});
	},
});

export const { initAuth, resetAuth } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth.auth;

export default authSlice.reducer;

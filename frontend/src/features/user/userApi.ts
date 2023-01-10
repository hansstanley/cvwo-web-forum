import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Auth, AuthResponse, User } from '../../types/user';
import { selectClient } from '../api/apiSlice';

export const handleUserLogin = createAsyncThunk(
	'user/login',
	async (auth: Auth, { getState }) => {
		const client = selectClient(getState() as RootState);
		try {
			const response = await client.post<AuthResponse>('auth/login', auth);
			return response.data;
		} catch (err) {
			// TODO: Handle error
			console.error(err);
			throw err;
		}
	},
);

export const handleUserRegister = createAsyncThunk(
	'user/register',
	async (auth: Auth, { getState }) => {
		try {
			const client = selectClient(getState() as RootState);
			const response = await client.post<User>('users', auth);
			return response.data;
		} catch (err) {
			// TODO: Handle error
			console.error(err);
			throw err;
		}
	},
);

export const fetchUserByUsername = createAsyncThunk(
	'user/one',
	async (username: string, { getState }) => {
		try {
			const client = selectClient(getState() as RootState);
			const response = await client.get<User>('users', {
				params: { username },
			});
			return response.data;
		} catch (err) {
			// TODO: handle error
			console.error(err);
			throw err;
		}
	},
);

export const updateUsername = createAsyncThunk(
	'user/update/username',
	async (username: string, { getState }) => {
		try {
			const state = getState() as RootState;
			const client = selectClient(state);
			const id = state.user.userInfo?.id;
			const response = await client.patch<User>(`users/${id}`, { username });
			return response.data;
		} catch (err) {
			console.error(err);
			throw err;
		}
	},
);

export const updatePassword = createAsyncThunk(
	'user/update/password',
	async (password: string, { getState }) => {
		try {
			const state = getState() as RootState;
			const client = selectClient(state);
			const id = state.user.userInfo?.id;
			const response = await client.patch<User>(`users/${id}`, { password });
			return response.data;
		} catch (err) {
			console.error(err);
			throw err;
		}
	},
);

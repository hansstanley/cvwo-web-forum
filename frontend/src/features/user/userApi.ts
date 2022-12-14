import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { client } from '../../api/client';
import { User } from '../../types';

export const handleUserLogin = createAsyncThunk(
	'user/login',
	async (username: string) => {
		try {
			const response = await client.get<User>('users', {
				params: { username },
			});
			return response.data;
		} catch (err) {
			if (err instanceof AxiosError) {
				switch (err.response?.status) {
					case 404:
						throw new Error('Username does not exist.');
					default:
						throw new Error(`An error occurred: ${err.message}`);
				}
			} else {
				throw err;
			}
		}
	},
);

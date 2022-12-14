import axios, { AxiosInstance } from 'axios';
import { RootState } from '../../app/store';

export const selectClient: (state: RootState) => AxiosInstance = (state) =>
	axios.create({
		baseURL: process.env.REACT_APP_BASE_URL,
		headers: state.user.auth
			? { Authorization: `Bearer ${state.user.auth.token}` }
			: undefined,
	});

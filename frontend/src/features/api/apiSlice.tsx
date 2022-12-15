import { createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectAuth } from '../user/userSlice';

export const selectClient = createSelector([selectAuth], (auth) => {
	return axios.create({
		baseURL: process.env.REACT_APP_BASE_URL,
		headers: auth ? { Authorization: `Bearer ${auth.token}` } : undefined,
	});
});

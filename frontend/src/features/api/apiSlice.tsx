import { createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import { selectAuth } from '../auth/authSlice';

/**
 * Selector for the axios HTTP client, wrapped in createSelector so that
 * the client is memoized and not created with every request.
 */
export const selectClient = createSelector([selectAuth], (auth) => {
	return axios.create({
		baseURL: process.env.REACT_APP_BASE_URL,
		headers: auth ? { Authorization: `Bearer ${auth.token}` } : undefined,
	});
});

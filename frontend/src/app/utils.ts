import dayjs from 'dayjs';
import { AuthResponse } from '../types/user';
import { AUTH_TOKEN_KEY, COLORS } from './constants';

/**
 * Retrieves the JWT from LocalStorage.
 * @returns AuthResponse object.
 */
export function getAuth() {
	const authString = localStorage.getItem(AUTH_TOKEN_KEY);
	const auth: AuthResponse = authString ? JSON.parse(authString) : undefined;
	return auth;
}

/**
 * Stores the JWT in LocalStorage.
 * @param auth AuthResponse object.
 */
export function setAuth(auth: AuthResponse | undefined) {
	if (auth) {
		localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(auth));
	} else {
		localStorage.removeItem(AUTH_TOKEN_KEY);
	}
}

/**
 * Returns a random color from COLORS.
 * @returns A random color.
 */
export function randomColor() {
	return COLORS[Math.floor(Math.random() * COLORS.length)];
}

/**
 * Formats a timestamp string into 'D MMM YYYY hh:mm A'
 * (e.g. 1 Jan 2000 01:01 AM)
 * @param timestamp Timestamp string in ISO 8601 format
 * @returns Formatted timestamp string.
 */
export function formatTimestamp(timestamp: string) {
	return dayjs(timestamp).format('D MMM YYYY hh:mm A');
}

import { AuthResponse } from '../types/user';
import { AUTH_TOKEN_KEY } from './constants';

export function getAuth() {
	const authString = localStorage.getItem(AUTH_TOKEN_KEY);
	const auth: AuthResponse = authString ? JSON.parse(authString) : undefined;
	return auth;
}

export function setAuth(auth: AuthResponse | undefined) {
	if (auth) {
		localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(auth));
	} else {
		localStorage.removeItem(AUTH_TOKEN_KEY);
	}
}

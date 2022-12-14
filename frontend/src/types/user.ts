export interface User {
	id?: number;
	username: string;
	deleted?: boolean;
}

export interface Auth {
	username: string;
	password: string;
	password_confirmation?: string;
}

export interface AuthResponse {
	username: string;
	token: string;
	exp: string;
}

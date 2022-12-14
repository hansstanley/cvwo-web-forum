import axios, { AxiosError } from 'axios';
import _ from 'lodash';

export const client = axios.create({
	baseURL: 'http://localhost:3000',
});

export const handleAxiosError = (err: any, typeName: string) => {
	if (err instanceof AxiosError) {
		switch (err.response?.status) {
			case 400:
				throw new Error(`Bad request for ${typeName}.`);
			case 404:
				throw new Error(`${typeName} does not exist.`);
			default:
				throw new Error(`An error occurred: ${err.message}`);
		}
	} else {
		throw err;
	}
};

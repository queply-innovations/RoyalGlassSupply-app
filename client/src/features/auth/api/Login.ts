import axios from 'axios';
import { API_URLS } from '@/api';
import { UserResponse } from '../types';
import storage from '@/utils/storage';
// import storage from '@/utils/storage';

export interface LoginCredentials {
	email: string;
	password: string;
}

export const LoginUser = async (
	data: LoginCredentials,
): Promise<UserResponse | null> => {
	try {
		const response = await axios.post(`${API_URLS.LOGIN}`, data, {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		});
		storage.setToken(response.data.token);
		storage.setLogIn();
		if (response.status === 401) {
			return null;
		}
		return response.data;
	} catch (e) {
		console.log('LOGIN FAILED:', e);
		return null;
	}
};

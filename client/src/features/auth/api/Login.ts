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
): Promise<UserResponse> => {
	try {
		const response = await axios.post(`${API_URLS.LOGIN}`, {
			Headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			...data,
		});
		storage.setToken(response.data.token);
		return response.data;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

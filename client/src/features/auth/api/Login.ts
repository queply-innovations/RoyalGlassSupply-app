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

		const response = await axios.post(`${API_URLS.LOGIN}`, data, {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		}).catch((error) => {
			throw new Error(error.response.data.message)
		});

		return response.data;
};

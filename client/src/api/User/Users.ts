import axios from 'axios';
import { User } from '@/entities';
import { API_URLS } from '@/api';

export const fetchUser = async (): Promise<User[]> => {
	try {
		await new Promise(resolve => setTimeout(resolve, 1000));
		const response = await axios.get(`${API_URLS.USERS}`);
		if (response.data) {
			return response.data as User[];
		} else {
			throw new Error('Empty response data');
		}
	} catch (error) {
		console.error('Error fetching user:', error);
		throw error;
	}
};

export const getUsers = () => {
	return axios.get(`${API_URLS.USERS}`);
};

export const getUserRoles = () => {
	return axios.get(`${API_URLS.USER_ROLES}`);
};

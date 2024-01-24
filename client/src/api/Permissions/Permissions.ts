import axios from 'axios';
import { Permissions } from '@/entities';
import { API_URLS } from '@/api';

export const fetchPermissions = async (): Promise<Permissions[]> => {
	try {
		await new Promise(resolve => setTimeout(resolve, 1000));
		const response = await axios.get(`${API_URLS.PERMISSIONS}`);
		if (response.data) {
			return response.data as Permissions[];
		} else {
			throw new Error('Empty response data');
		}
	} catch (error) {
		console.error('Error fetching Permissions:', error);
		throw error;
	}
};

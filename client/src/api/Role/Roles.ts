import axios from 'axios';
import { Roles } from '../../entities';
import { API_BASE_URL } from '../Url';

export const fetchRoles = async (): Promise<Roles[]> => {
	try {
		await new Promise(resolve => setTimeout(resolve, 1000));
		const response = await axios.get(`${API_BASE_URL}/roles`);
		if (response.data) {
			return response.data as Roles[];
		} else {
			throw new Error('Empty response data');
		}
	} catch (error) {
		console.error('Error fetching Roles:', error);
		throw error;
	}
};

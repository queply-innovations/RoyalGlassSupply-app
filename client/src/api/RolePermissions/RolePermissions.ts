import { RolePermissions } from '@/entities';
import axios from 'axios';
import { API_HEADERS, API_URLS } from '@/api';

export const fetchRolePermissions = async (): Promise<RolePermissions[]> => {
	try {
		await new Promise(resolve => setTimeout(resolve, 1000));
		const response = await axios.get(`${API_URLS.ROLE_PERMISSIONS}`, {
			headers: API_HEADERS()
		});
		if (response.data) {
			return response.data as RolePermissions[];
		} else {
			throw new Error('Empty response data');
		}
	} catch (error) {
		console.error('Error fetching role permissions:', error);
		throw error;
	}
};

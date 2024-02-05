import axios from 'axios';
import { UserRoles } from '@/entities';
import { API_URLS } from '@/api';

export const fetchUserRoles = async (id: number): Promise<UserRoles[]> => {
	try {
		await new Promise(resolve => setTimeout(resolve, 1000));
		const response = await axios.get(`${API_URLS.USER_ROLES}/${id}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('BearerToken')}`,
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		});

		if (response.data) {
			return response.data as UserRoles[];
		} else {
			throw new Error('Empty response data');
		}
	} catch (error) {
		console.error('Error fetching user roles:', error);
		throw error;
	}
};

import axios from 'axios';
import { UserRoles } from '@/entities';
import { API_URLS } from '@/api';

export const fetchUserRoles = async (id: number): Promise<UserRoles[]> => {
	try {
		await new Promise(resolve => setTimeout(resolve, 1000));
		const response = await axios.post(`${API_URLS.USER_ROLES}/searches-filters-sorts`, {'user_id': id},
		{
			headers: {
				// Token from localStorage must be parsed
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('token') ?? "''")}`,
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

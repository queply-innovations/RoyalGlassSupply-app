import { API_URLS } from '@/api';
import { User } from '@/entities';
import storage from '@/utils/storage';
import axios from 'axios';
import { RolePermissions, Roles } from '../types';

export const getUser = async (id: number): Promise<User[]> => {
	return axios.get(`${API_URLS.USERS}/${id}`, {
		headers: {
			Authorization: `Bearer ${storage.getToken()}`,
			'Content-Type': 'application/json',
		},
	});
};

export const getUserRole = async (id: number): Promise<Roles> => {
	try {
		const response = await axios.get(`${API_URLS.ROLES}/${id}`, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
		});
		return response.data;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const getUserRolePermissions = async (
	id: number,
): Promise<RolePermissions> => {
	return axios.get(`${API_URLS.ROLE_PERMISSIONS}/${id}`, {
		headers: {
			Authorization: `Bearer ${storage.getToken()}`,
			'Content-Type': 'application/json',
		},
	});
};

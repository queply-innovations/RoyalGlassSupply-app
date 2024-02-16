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

export const getUserRole = async (id: number): Promise<Roles["title"]> => {
	try {
		const response = await axios.post(`${API_URLS.USER_ROLES}/searches-filters-sorts`,{"user_id": id}, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
		});
		// Data contains object with an array of one object
		return response.data.data[0].role.title;
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

export const getUsers = async (): Promise<User[]> => {
	return axios.get(`${API_URLS.USERS}`, {
		headers: {
			Authorization: `Bearer ${storage.getToken()}`,
			'Content-Type': 'application/json',
		},
	});
};

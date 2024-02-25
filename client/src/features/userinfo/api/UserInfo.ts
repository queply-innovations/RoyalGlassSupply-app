import { API_HEADERS, API_URLS } from '@/api';
import { User } from '@/entities';
import storage from '@/utils/storage';
import axios from 'axios';
import { RolePermissions, Roles } from '../types';

export const fetchUsers = async (): Promise<User[]> => {
	return await axios
		.get(API_URLS.USERS, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching users:', error);
			throw error;
		});
};

export const getUser = async (id: number): Promise<User[]> => {
	return axios.get(`${API_URLS.USERS}/${id}`, {
		headers: {
			Authorization: `Bearer ${storage.getToken()}`,
			'Content-Type': 'application/json',
		},
	});
};

export const getUserRole = async (id: number): Promise<Roles['title']> => {
	try {
		const response = await axios.post(
			`${API_URLS.USER_ROLES}/searches-filters-sorts`,
			{ user_id: id },
			{
				headers: {
					Authorization: `Bearer ${storage.getToken()}`,
					'Content-Type': 'application/json',
				},
			},
		);
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

export const getRoles = async (): Promise<Roles[]> => {
	return axios.get(`${API_URLS.ROLES}`, {
		headers: {
			Authorization: `Bearer ${storage.getToken()}`,
			'Content-Type': 'application/json',
		},
	});
};

export const addUser = async (data: User) => {
	try {
		const response = await axios
			.post(API_URLS.WAREHOUSE, data, {
				headers: {
					Authorization: `Bearer ${storage.getToken()}`,
					'Content-Type': 'application/json',
				},
			});
		return response.data;
	} catch (error) {
		console.error('Error adding user:', error);
		throw error;
	}
};
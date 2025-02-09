import { API_URLS } from '@/api';
import { User } from '@/entities';
import storage from '@/utils/storage';
import axios from 'axios';
import { RolePermissions, Roles, UserWarehouses } from '../types';

export const getUser = async (id: number): Promise<User[]> => {
	return axios.get(`${API_URLS.USERS}/${id}`, {
		headers: {
			Authorization: `Bearer ${storage.getToken()}`,
			'Content-Type': 'application/json',
		},
	});
};

export const getUserRole = async (id: number, _updateProgress = ''): Promise<Roles> => {
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
		return response.data.data[0].role;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

export const getUserRolePermissions = async (role_id: number): Promise<RolePermissions[]> => {
	return await axios
	.post(`${API_URLS.ROLE_PERMISSIONS}/searches-filters-sorts`, 
		{'role_id': role_id}, 

		{
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
		})

		.then(response => {
			return response.data.data;
		})

		.catch(error => {
			console.error('Error fetching role permissions:', error);
			throw error;
		});
};

export const getUserAssignedAt = async (role_id: number): Promise<UserWarehouses[]> => {
	return await axios
	.post(`${API_URLS.USER_WAREHOUSES}/searches-filters-sorts`, 
		{'role_id': role_id}, 

		{
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
		})

		.then(response => {
			return response.data.data;
		})

		.catch(error => {
			console.error('Error fetching user warehouses:', error);
			throw error;
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

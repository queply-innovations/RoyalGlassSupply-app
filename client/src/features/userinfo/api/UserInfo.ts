import { API_HEADERS, API_URLS } from '@/api';
import { User } from '../types';
import { User as IUser } from '@/entities';
import storage from '@/utils/storage';
import axios from 'axios';
import { RolePermissions, Roles } from '../types';

export const fetchUsers = async (updateProgress: any): Promise<User[]> => {
	return await axios
		.get(API_URLS.USERS, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
			onDownloadProgress: (progress) => {
				let percentCompleted = Math.round((progress.loaded / progress.total) * 100);
				updateProgress(percentCompleted);
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

export const getRoles = async (updateProgress: any): Promise<Roles> => {
	return await axios
	.get(`${API_URLS.ROLES}`, {
		headers: {
			Authorization: `Bearer ${storage.getToken()}`,
			'Content-Type': 'application/json',
		},
		onDownloadProgress: (progress) => {
			let percentCompleted = Math.round((progress.loaded / progress.total) * 100);
			updateProgress(percentCompleted);
		},
	})
	.then(response => {
		return response.data.data;
	})
	.catch(error => {
		console.error('Error fetching roles:', error);
		throw error;
	});
};

export const editUser = async (data: any) => {
	// console.log(data);
	return await axios
	.put(`${API_URLS.USERS}/${data.user_id}`, data,
	{
		headers: {
			Authorization: `Bearer ${storage.getToken()}`,
			'Content-Type': 'application/json',
		},
	})
	.then(async response => {
		// console.log(response);
		return await axios
		.post(`${API_URLS.USER_ROLES}/searches-filters-sorts`,
			{ user_id: data.user_id },
			{
				headers: {
					Authorization: `Bearer ${storage.getToken()}`,
					'Content-Type': 'application/json',
				},
			},
		)
		.then (async response2 => {
			const data2 = {user_id: data.user_id, role_id: data.role_id};
			return await axios
			.put(`${API_URLS.USER_ROLES}/${response2.data.data[0].id}`, data2,
			{
				headers: {
					Authorization: `Bearer ${storage.getToken()}`,
					'Content-Type': 'application/json',
				},
			})
			.then(response => {
				// console.log(response);
				return response.data.data;
			})
			.catch(error => {
				console.error('Error putting user changes:', error);
				throw error;
			});
		})
		.catch(error => {
			console.error('Error getting user_roles:', error);
			throw error;
		});
	})
	.catch(error => {
		console.error('Error putting user changes:', error);
		throw error;
	});
};

export const addUser = async (data: IUser) => {
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
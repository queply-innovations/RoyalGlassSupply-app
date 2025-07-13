import axios from 'axios';
import { RolePermissions, Roles, User, UserRoles } from '@/entities';
import { API_BASE_URL, API_URLS } from '@/api';

export const fetchUser = async (): Promise<User[]> => {
	try {
		await new Promise(resolve => setTimeout(resolve, 1000));
		const response = await axios.get(`${API_URLS.USERS}`);
		if (response.data) {
			return response.data as User[];
		} else {
			throw new Error('Empty response data');
		}
	} catch (error) {
		console.error('Error fetching user:', error);
		throw error;
	}
};

export const getUsers = () => {
	return axios.get(`${API_URLS.USERS}`);
};

export const getUserRoles = () => {
	return axios.get(`${API_URLS.USER_ROLES}`);
}

const fetchUserInformation = async (): Promise<{
	user: User[];
	user_roles: UserRoles[];
	roles: Roles[];
	role_permissions: RolePermissions[];
}> => {
	try {
		await new Promise(resolve => setTimeout(resolve, 100));
		const responseUser = await axios.get(`${API_URLS.USERS}`);
		const responseUserRoles = await axios.get(`${API_URLS.USER_ROLES}`);
		const reponseRoles = await axios.get(`${API_URLS.ROLES}`);
		const responseRolePermissions = await axios.get(
			`${API_URLS.ROLE_PERMISSIONS}`,
		);
		if (
			responseUser.data &&
			responseUserRoles.data &&
			reponseRoles.data &&
			responseRolePermissions.data
		) {
			return {
				user: responseUser.data as User[],
				user_roles: responseUserRoles.data as UserRoles[],
				roles: reponseRoles.data as Roles[],
				role_permissions: responseRolePermissions.data as RolePermissions[],
			};
		} else {
			throw new Error('Empty response User Information');
		}
	} catch (error) {
		console.error('Error fetching user:', error);
		throw error;
	}
};

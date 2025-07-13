import axios from 'axios';
import { RolePermissions, Roles, User, UserRoles } from '@/entities/User';
import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from './Url';

const fetchUserInformation = async (): Promise<{
	user: User[];
	user_roles: UserRoles[];
	roles: Roles[];
	role_permissions: RolePermissions[];
}> => {
	try {
		await new Promise(resolve => setTimeout(resolve, 100));
		const responseUser = await axios.get(`${API_BASE_URL}/users`);
		const responseUserRoles = await axios.get(`${API_BASE_URL}/user_roles`);
		const reponseRoles = await axios.get(`${API_BASE_URL}/roles`);
		const responseRolePermissions = await axios.get(
			`${API_BASE_URL}/role_permissions`,
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

const combineUserInformation = async () => {
	try {
		const userInformation = await fetchUserInformation();
		const user = userInformation.user;
		const user_roles = userInformation.user_roles;
		const roles = userInformation.roles;
		const role_permissions = userInformation.role_permissions;
		const combinedUser = user.map((user: User) => {
			// 	const userRole = user_roles.find(
			// 		(user_role: UserRoles) => user_role.userId === user.id,
			// 	);
			// 	const role = roles.find((role: Roles) => role.id === userRole?.roleId);
			// 	const rolePermission = role_permissions.find(
			// 		(role_permission: RolePermissions) =>
			// 			role_permission.roleId === role?.id,
			// 	);
			// 	return {
			// 		...user,
			// 		role: role,
			// 		rolePermission: rolePermission,
			// 	};
			// });
			const userRole = user_roles.find(
				user_role => user_role.userId === user.id,
			);
			console.log(userRole);
			const role = roles.find(role => role.id === userRole?.roleId);
			const rolePermission = role_permissions.find(
				role_permission => role_permission.roleId === role?.id,
			);
			return {
				...user,
				role: role,
				rolePermission: rolePermission,
			};
		});
		return combinedUser;
	} catch (error) {
		console.error('Error fetching user information:', error);
		throw error;
	}
};

// combineUserInformation().then(UserInfo => {
// 	console.log('Combined User', UserInfo);
// });

const fetchUserInfo = async (query = ''): Promise<User[]> => {
	await new Promise(resolve => setTimeout(resolve, 100));
	const response = await axios.get(`${API_BASE_URL}/users`);
	// console.log('Fetched Users');
	// console.log(response.data);
	return response.data;
};

export const useUserInfo = () => {
	return useQuery({
		queryKey: ['userInfo'],
		queryFn: () => fetchUserInfo(),
		refetchOnWindowFocus: false,
	});
};

export const useLoginUser = (data: any) => {
	const username = data.username;
	const password = data.password;
	const role = data.role;
	console.log(`Username: ${username}, Password: ${password}, Role: ${role}`);
};

export const loginUser = async (username: string, password: string) => {
	try {
		const result = await axios.get(`${API_BASE_URL}/users`, {
			headers: {
				'Content-Type': 'application/json',
			},
			params: {
				username: username,
				password: password,
			},
		});
		const data = { datas: Object.values(result.data) };
		return data;
	} catch (e) {
		return null;
	}
};
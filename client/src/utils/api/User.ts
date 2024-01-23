import axios from 'axios';
import { RolePermissions, Roles, User, UserRoles } from '@/entities/User';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE_URL = 'https://65956d2504335332df82b67a.mockapi.io/rgs/api';

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

fetchUserInformation().then(UserInfo => {
	console.log('Combined User', UserInfo);
});

const fetchUserInfo = async (query = ''): Promise<User[]> => {
	await new Promise(resolve => setTimeout(resolve, 100));
	const response = await axios.get(`${API_BASE_URL}/users`);
	console.log('Fetched Users');
	console.log(response.data);
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

export const loginUser = async (username: String, password: String) => {
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

// export const getUserInfo = async (username: string, password: string) => {
// 	await axios.get(`${API_BASE_URL}/UserInfo`)
// 		.then(function (response){
// 			// console.log(response.data);
// 			const user = response.data.find((user: User) => user.username === username && user.password === password);
// 			console.log(user);
// 			// console.log(user);
// 			return user;
// 		})
// };

// await new Promise(resolve => setTimeout(resolve, 1000));
// try {
// 	const response = await axios.get(
// 		'https://my.api.mockaroo.com/rgs/user_information?key=a499edc0',
// 		{ params: { query } },
// 	);
// 	return response.data;
// } catch (error) {
// 	console.error('Error fetching user information:', error);
// 	throw error;
// }
// await new Promise(resolve => setTimeout(resolve, 1000));

// alert(response);
// return response.data;
// return response;
// return response.data;
// return useQuery({
// 	queryKey: ['user_info'],
// 	queryFn: () => fetchUserInfo(),
// 	refetchOnWindowFocus: false,
// });

// export const fetchUserInfo = async () => {
// 	const result = await axios.get(
// 		'https://my.api.mockaroo.com/rgs/user_information?key=a499edc0',
// 	);
// 	return result.data;
// };

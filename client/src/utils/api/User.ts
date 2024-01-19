import axios from 'axios';
import { UserInfo } from '@/pages/User/UserInfo';
import { User } from '@/entities/User';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE_URL = 'https://65956d2504335332df82b67a.mockapi.io/rgs/api';

// export interface UserInfo {
// 	first_name: string;
// 	last_name: string;
// 	role: string;
// 	username: string;
// 	contact_number: string;
// 	emergency_number: string;
// }

const fetchUserInfo = async (query = ''): Promise<User[]> => {
	await new Promise(resolve => setTimeout(resolve, 100));
	const response = await axios.get(`${API_BASE_URL}/UserInfo`);
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
	try{
		const result = await axios.get((`${API_BASE_URL}/UserInfo`), {
			headers: {
				"Content-Type": "application/json"
			},
			params: {
				username: username,
				password: password
			}
		})
		const data = {datas: Object.values(result.data)};
		return data;
	}catch (e){
		return null
	}
}

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

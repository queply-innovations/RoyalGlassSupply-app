import axios from 'axios';
import { UserInfo } from '@/pages/User/UserInfo';

export interface UserInfo {
	first_name: string;
	last_name: string;
	role: string;
	username: string;
	contact_number: string;
	emergency_number: string;
}

// export const fetchUserInfo = async (query = ''): Promise<UserInfo[]> => {
// 	await new Promise(resolve => setTimeout(resolve, 1000));
// 	try {
// 		const response = await axios.get(
// 			'https://my.api.mockaroo.com/rgs/user_information?key=a499edc0',
// 			{ params: { query } },
// 		);
// 		return response.data;
// 	} catch (error) {
// 		console.error('Error fetching user information:', error);
// 		throw error;
// 	}
// };

export const fetchUserInfo = async () => {
	const result = await axios.get(
		'https://my.api.mockaroo.com/rgs/user_information?key=a499edc0',
	);
	return result.data;
};

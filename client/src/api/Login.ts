import axios from 'axios';
import { API_URLS } from '@/api';
import { User } from '@/entities';

interface UserData {
	user: User;
	token: string;
}
export const LoginUser = async (
	email: string,
	password: string,
): Promise<UserData | null> => {
	try {
		const response = await axios.post(`${API_URLS.LOGIN}`, {
			Headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			email,
			password,
		});
		const userData = response.data as UserData;

		localStorage.setItem('BearerToken', userData.token);

		return userData;
	} catch (error) {
		console.log('Error logging in:', error);
		throw error;
	}
};

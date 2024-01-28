import axios from 'axios';
import { API_URLS } from '@/api';
import { User } from '@/entities';

interface UserData {
	user: User;
	token: string;
}
export const LoginUser = async (
	username: string,
	password: string,
): Promise<UserData | null> => {
	try {
		const response = await axios.post(`${API_URLS.LOGIN}`, {
			username,
			password,
		});
		console.log('Response', response.data);
		return response.data as UserData;
	} catch (error) {
		console.log('Error logging in:', error);
		throw error;
	}
};

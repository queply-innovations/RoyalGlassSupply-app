import axios from 'axios';
import { API_URLS, API_HEADERS } from '@/api';
import { Customer } from '../types';

export const addCustomer = async (data: Partial<Customer>) => {
	return await axios
		.post(API_URLS.CUSTOMERS, data, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return { status: response.status, data: response.data };
		})
		.catch((error: Error) => {
			console.error('Error adding customer:', error.message);
			throw error;
		});
};

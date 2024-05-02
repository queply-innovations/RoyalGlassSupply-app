import axios from 'axios';
import { API_HEADERS, API_URLS } from '@/api';
import { ReturnTransactions } from '../types';

export const fetchReturns = async (): Promise<ReturnTransactions[]> => {
	return await axios
		.get(API_URLS.RETURN_TRANSACTIONS, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return response.data.data as ReturnTransactions[];
		})
		.catch(error => {
			console.error('Error fetching returns:', error);
			throw error;
		});
};

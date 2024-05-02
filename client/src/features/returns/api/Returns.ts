import axios from 'axios';
import { API_HEADERS, API_URLS } from '@/api';
import { ReturnItems, ReturnTransactions } from '../types';

export const fetchReturns = async (): Promise<ReturnTransactions[]> => {
	return await axios
		.get(API_URLS.RETURN_TRANSACTIONS, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching returns:', error);
			throw error;
		});
};

export const fetchReturnItemsByReturnId = async (
	id: number,
): Promise<ReturnItems[]> => {
	return await axios
		.post(
			`${API_URLS.RETURN_TRANSACTIONS_ITEMS}/searches-filters-sorts`,
			{ return_transaction_id: JSON.stringify(id) },
			{ headers: API_HEADERS() },
		)
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching return items:', error);
			throw error;
		});
};

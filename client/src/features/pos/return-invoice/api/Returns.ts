import { API_HEADERS, API_URLS } from '@/api';
import {
	ReturnInvoice,
	ReturnInvoiceItems,
} from '@/features/invoice/__test__/types';
import axios from 'axios';

export const submitReturnInvoice = async (data: ReturnInvoice) => {
	return await axios
		.post(API_URLS.RETURN_TRANSACTIONS, data, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error submitting return invoice:', error);
			throw error;
		});
};

export const submitReturnInvoiceItems = async (data: ReturnInvoiceItems) => {
	return await axios
		.post(API_URLS.RETURN_TRANSACTIONS_ITEMS, data, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error submitting return invoice items:', error);
			throw error;
		});
};

export const fetchReturnTransactionByCode = async (
	code: string,
): Promise<ReturnInvoice[]> => {
	return await axios
		.post(
			`${API_URLS.RETURN_TRANSACTIONS}/searches-filters-sorts`,
			{
				search: {
					code: code,
				},
			},
			{ headers: API_HEADERS() },
		)
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching return transaction by code:', error);
			throw error;
		});
};

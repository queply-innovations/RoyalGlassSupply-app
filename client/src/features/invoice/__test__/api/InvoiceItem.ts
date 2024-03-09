import { API_URLS, API_HEADERS } from '@/api';
import axios from 'axios';
import { InvoiceItems } from '../types';

export const fetchInvoiceItems = async (): Promise<InvoiceItems[]> => {
	return await axios
		.get(API_URLS.INVOICE_ITEMS, {
			headers: API_HEADERS,
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching invoice items:', error);
			throw error;
		});
};

export const addInvoiceItems = async (data: InvoiceItems[]) => {
	return await axios
		.post(API_URLS.INVOICE_ITEMS, data, {
			headers: API_HEADERS,
		})
		.then(response => {
			return response.data;
		})
		.catch(error => {
			console.error('Error adding invoice items:', error);
			throw error;
		});
};

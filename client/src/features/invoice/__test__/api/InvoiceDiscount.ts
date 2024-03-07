import { API_URLS, API_HEADERS } from '@/api';
import axios from 'axios';
import { InvoiceDiscount } from '../types';

export const fetchInvoiceDiscounts = async (): Promise<InvoiceDiscount[]> => {
	return await axios
		.get(API_URLS.INVOICE_DISCOUNTS, {
			headers: API_HEADERS,
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching invoice discounts:', error);
			throw error;
		});
};

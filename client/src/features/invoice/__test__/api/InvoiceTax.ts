import { API_URLS, API_HEADERS } from '@/api';
import axios from 'axios';
import { InvoiceTaxes } from '../types';

export const fetchInvoiceTaxes = async (): Promise<InvoiceTaxes[]> => {
	return await axios
		.get(API_URLS.INVOICE_TAXES, {
			headers: API_HEADERS,
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching invoice taxes:', error);
			throw error;
		});
};

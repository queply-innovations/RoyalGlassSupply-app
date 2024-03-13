import { API_HEADERS, API_URLS } from '@/api';
import storage from '@/utils/storage';
import axios from 'axios';
import { Invoice } from '../types';

export const fetchInvoices = async (): Promise<Invoice[]> => {
	return await axios
		.get(API_URLS.INVOICE, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching invoices:', error);
			throw error;
		});
};
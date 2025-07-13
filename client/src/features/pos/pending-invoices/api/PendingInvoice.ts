import axios from 'axios';
import { Invoices } from '@/features/invoice/__test__/types';
import { InvoiceItems } from '@/features/invoice/__test__/types';
import { API_URLS, API_HEADERS } from '@/api';

export const fetchPendingInvoices = async (): Promise<Invoices[]> => {
	return await axios
		.post(
			`${API_URLS.INVOICE}/searches-filters-sorts`,
			{
				filter: {
					status: 'pending',
				},
			},
			{
				headers: API_HEADERS(),
			},
		)
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching pending invoices:', error);
			throw error;
		});
};

export const approvePendingInvoice = async (id: number): Promise<Invoices> => {
	return axios
		.put(
			`${API_URLS.INVOICE}/${id}`,
			{
				status: 'approved',
			},
			{
				headers: API_HEADERS(),
			},
		)
		.then(response => {
			return response.data;
		})
		.catch(error => {
			console.error('Error approving invoice:', error);
			throw error;
		});
};

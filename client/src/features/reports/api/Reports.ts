import axios from 'axios';
import { API_HEADERS, API_URLS } from '@/api';
import { Invoices } from '@/features/invoice/__test__/types';

export const fetchInvoicesDateRange = async (
	dateFrom: Date,
	dateTo: Date,
): Promise<Invoices[]> => {
	return await axios
		.post(
			`${API_URLS.INVOICE}/searches-filters-sorts`,
			{
				date_range: {
					created_at: {
						from: dateFrom.toISOString().split('T')[0],
						to: dateTo.toISOString().split('T')[0],
					},
					updated_at: {
						from: dateFrom.toISOString().split('T')[0],
						to: dateTo.toISOString().split('T')[0],
					},
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
			console.error('Error fetching invoices:', error);
			throw error;
		});
};

export const fetchPreviousInvoices = async (
	dateTo: Date,
): Promise<Invoices[]> => {
	return await axios
		.post(
			`${API_URLS.INVOICE}/searches-filters-sorts`,
			{
				date_range: {
					created_at: {
						from: new Date('2024-01-01').toISOString().split('T')[0],
						to: dateTo.toISOString().split('T')[0],
					},
					updated_at: {
						from: new Date('2024-01-01').toISOString().split('T')[0],
						to: dateTo.toISOString().split('T')[0],
					},
				},
			},
			{
				headers: API_HEADERS(),
			},
		)
		.then(response => {
			console.log(response.data.data);
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching invoices:', error);
			throw error;
		});
};

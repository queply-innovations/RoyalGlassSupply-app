import axios from 'axios';
import { API_HEADERS, API_URLS } from '@/api';
import { Invoices } from '@/features/invoice/__test__/types';
import {
	InventoryLevelReport,
	ReportAnalytics,
	Reports,
	TopSellingProducts,
} from '../types';

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
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching invoices:', error);
			throw error;
		});
};

export const fetchInvoicesLastTwelveMonths = async (): Promise<Invoices[]> => {
	const currentDate = new Date();
	const fromDate = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() - 11,
		1,
	);
	const toDate = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		0,
	);

	return await axios
		.post(
			`${API_URLS.INVOICE}/searches-filters-sorts`,
			{
				date_range: {
					created_at: {
						from: fromDate.toISOString().split('T')[0],
						to: toDate.toISOString().split('T')[0],
					},
					updated_at: {
						from: fromDate.toISOString().split('T')[0],
						to: toDate.toISOString().split('T')[0],
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

export const fetchReports = async (
	dateFrom: Date,
	dateTo: Date,
): Promise<Reports> => {
	return await axios
		.post(
			`${API_URLS.REPORTS}`,
			{
				date_from: dateFrom.toISOString().split('T')[0],
				date_to: dateTo.toISOString().split('T')[0],
			},
			{
				headers: API_HEADERS(),
			},
		)
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching reports:', error);
			return error;
		});
};

export const fetchReportAnalytics = async (
	year: number,
	warehouseId: number,
): Promise<ReportAnalytics[]> => {
	return await axios
		.post(
			`${API_URLS.REPORTS}/analytics`,
			{
				year: year,
				warehouse: warehouseId !== 0 ? warehouseId : '',
			},
			{ headers: API_HEADERS() },
		)
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching report analytics:', error);
			throw error;
		});
};

export const fetchTopSellingProducts = async (): Promise<
	TopSellingProducts[]
> => {
	return await axios
		.post(
			`${API_URLS.REPORTS}/most-bought-products`,
			{
				type: 'payment',
			},
			{
				headers: API_HEADERS(),
			},
		)
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching top selling products:', error);
			throw error;
		});
};

export const fetchInventoryLevelReport = async (
	warehouseId: number,
): Promise<InventoryLevelReport> => {
	return await axios
		.post(
			`${API_URLS.REPORTS}/inventory-level`,
			{ warehouse: warehouseId },
			{ headers: API_HEADERS() },
		)
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching inventory level report:', error);
			throw error;
		});
};

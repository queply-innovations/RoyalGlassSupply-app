import { useQueries, useQuery } from '@tanstack/react-query';
import {
	InvoiceItemDatabase,
	Invoices,
	ReturnInvoiceDatabase,
} from '../types/index';
import { useEffect, useState } from 'react';
import {
	fetchInvoiceByCode,
	fetchInvoiceById,
	fetchInvoiceItemsById,
	// fetchInvoiceDiscounts,
	// fetchInvoiceItems,
	// fetchInvoiceTaxes,
	fetchInvoices,
} from '../api';

export const useInvoiceQuery = () => {
	const [invoices, setInvoices] = useState<Invoices[]>([]);

	const invoiceQuery = useQuery({
		queryKey: ['invoices'],
		queryFn: () => fetchInvoices(),
		refetchOnWindowFocus: false,
	});

	// const invoiceQueries = useQueries({
	// 	queries: [
	// 		{
	// 			queryKey: ['invoices'],
	// 			queryFn: () => fetchInvoices(),
	// 		},
	// 		{
	// 			queryKey: ['invoiceItems'],
	// 			queryFn: () => fetchInvoiceItems(),
	// 		},
	// 		{
	// 			queryKey: ['invoiceDiscount'],
	// 			queryFn: () => fetchInvoiceDiscounts(),
	// 		},
	// 		{
	// 			queryKey: ['invoiceTax'],
	// 			queryFn: () => fetchInvoiceTaxes(),
	// 		},
	// 	],
	// 	combine: results => {
	// 		return results.map(result => result.data);
	// 	},
	// });

	useEffect(() => {
		const { data: invoice } = invoiceQuery;
		if (invoice) {
			setInvoices(invoice);
		}
	}, [invoiceQuery]);
	return { invoices, invoiceQuery };
};

export const useInvoiceCodeQuery = (code: string) => {
	const [invoice, setInvoice] = useState<ReturnInvoiceDatabase | null>(null);

	const { data: result, isFetching: isLoading } = useQuery({
		queryKey: ['ivc-code'],
		queryFn: () => fetchInvoiceByCode(code),
		refetchOnWindowFocus: false,
	});
	useEffect(() => {
		if (!isLoading && result) {
			setInvoice(result);
		}
	}, [result, isLoading]);

	return { invoice, isLoading };
};

export const useInvoiceQueryById = (id: number) => {
	const { data, isFetching: isLoading } = useQuery({
		queryKey: ['invoice'],
		queryFn: () => fetchInvoiceById(id),
		refetchOnWindowFocus: false,
	});

	return { data, isLoading };
};

export const useInvoiceItemQueryById = (id: number) => {
	const [invoiceItems, setInvoiceItems] = useState<InvoiceItemDatabase[]>([]);

	const { data: result, isFetching: isLoading } = useQuery({
		queryKey: ['invoiceItem'],
		queryFn: () => fetchInvoiceItemsById(id),
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (!isLoading && result) {
			setInvoiceItems(result);
		}
	}, [result, isLoading]);

	return { invoiceItems, isLoading };
};

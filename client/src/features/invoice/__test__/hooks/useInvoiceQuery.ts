import { useQueries, useQuery } from '@tanstack/react-query';
import { Invoices } from '../types/index';
import { useEffect, useState } from 'react';
import {
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

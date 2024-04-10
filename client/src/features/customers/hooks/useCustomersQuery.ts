import { useQuery } from '@tanstack/react-query';
import { fetchInvoices } from '../api/Customers';
import { useEffect, useState } from 'react';
import { Invoice } from '../types';

export const useCustomersQuery = () => {
	const [invoices, setInvoices] = useState<Invoice[]>([]);

	const { isFetching, data: invoiceQuery } = useQuery({
		queryKey: ['invoices'],
		queryFn: fetchInvoices,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		const invoices = invoiceQuery;
		if (invoices) {
			setInvoices(invoices);
		}
	}, [invoiceQuery]);

	return { invoices, invoiceQuery, isFetching };
};

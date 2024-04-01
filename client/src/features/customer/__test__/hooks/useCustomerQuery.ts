import { useEffect, useState } from 'react';
import { Customer } from '../types';
import { useQuery } from '@tanstack/react-query';
import { fetchCustomers } from '../api/Customer';

export const useCustomerQuery = () => {
	// State of the response data
	const [data, setData] = useState<Customer[]>([] as Customer[]);

	// Query for fetching inventory products and isLoading state
	const { data: result, isFetching: isLoading } = useQuery({
		queryKey: ['customers'],
		queryFn: () => fetchCustomers(),
		refetchOnWindowFocus: false,
	});

	// Update states when query results changes [result, isLoading]
	useEffect(() => {
		if (!isLoading && result) {
			setData(result);
		}
	}, [result, isLoading]);

	return { data, isLoading };
};

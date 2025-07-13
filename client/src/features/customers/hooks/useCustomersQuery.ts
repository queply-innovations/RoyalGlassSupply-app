import { useQuery } from '@tanstack/react-query';
import { fetchCustomers } from '../api/Customers';

export const useCustomersQuery = () => {
	const { isFetching, data: customers } = useQuery({
		queryKey: ['customers'],
		queryFn: fetchCustomers,
		refetchOnWindowFocus: false,
	});

	return { customers, isFetching };
};

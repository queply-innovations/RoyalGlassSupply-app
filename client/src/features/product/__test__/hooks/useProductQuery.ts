import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/Products';
import { useEffect, useState } from 'react';
import { Product } from '../types';

/**
 * Custom hook for fetching and managing products.
 *
 * @returns An object containing the response data and loading state.
 */
export const useProductQuery = () => {
	// State of the response data
	const [data, setData] = useState<Product[]>([] as Product[]);

	// Query for fetching products and isLoading state
	const { data: result, isFetching: isLoading } = useQuery({
		queryKey: ['products'],
		queryFn: () => fetchProducts(),
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

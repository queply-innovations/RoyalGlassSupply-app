import { useQuery } from '@tanstack/react-query';
import { fetchProductPrices } from '../api/Products';
import { useEffect, useState } from 'react';
import { ProductPrices } from '../types';

/**
 * Custom hook for fetching and managing product prices.
 *
 * @returns An object containing the response data and loading state.
 */
export const useProductPricesQuery = () => {
	// State of the response data and loading state
	const [data, setData] = useState<ProductPrices[]>([] as ProductPrices[]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	// Query for fetching product prices and isLoading state
	const { data: result, isFetching: loading } = useQuery({
		queryKey: ['productPrices'],
		queryFn: () => fetchProductPrices(),
		refetchOnWindowFocus: false,
	});

	// Update states when query results changes [result, loading]
	useEffect(() => {
		if (loading) {
			setIsLoading(true);
		} else if (!loading && result) {
			setIsLoading(false);
			setData(result);
		}
	}, [result, loading]);

	return { data, isLoading };
};

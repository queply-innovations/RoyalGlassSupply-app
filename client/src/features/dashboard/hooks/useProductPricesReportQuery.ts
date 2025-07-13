import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductPrices } from '@/features/product/__test__/types';
import { fetchProductPricesByDateRange } from '@/features/product/__test__/api/Products';

export const useProductPricesDateRange = () => {
	// State of the response data
	const [data, setData] = useState<ProductPrices[]>([] as ProductPrices[]);

	const dateFrom = new Date(
		new Date().getFullYear(),
		new Date().getMonth() - 5,
		1,
	);
	const dateTo = new Date();

	// Query for fetching product prices and isLoading state
	const { data: result, isFetching: isLoading } = useQuery({
		queryKey: ['pendingProductPrices'],
		queryFn: () => fetchProductPricesByDateRange(dateFrom, dateTo),
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

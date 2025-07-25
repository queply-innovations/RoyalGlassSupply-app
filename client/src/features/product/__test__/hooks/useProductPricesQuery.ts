import {
	keepPreviousData,
	useInfiniteQuery,
	useQuery,
} from '@tanstack/react-query';
import {
	fetchApprovedProductPrices,
	fetchPendingProductPrices,
	fetchProductPrices,
	fetchProductPricesFilters,
	fetchProductPricesPaginated,
} from '../api/Products';
import { useEffect, useState } from 'react';
import { ProductPrices } from '../types';

/**
 * Custom hook for fetching and managing product prices.
 *
 * @returns An object containing the response data and loading state.
 */
export const useProductPricesQuery = () => {
	// State of the response data
	const [data, setData] = useState<ProductPrices[]>([] as ProductPrices[]);

	// Query for fetching product prices and isLoading state
	const { data: result, isFetching: isLoading } = useQuery({
		queryKey: ['productPrices'],
		queryFn: () => fetchProductPrices(),
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

export const usePendingProductPricesQuery = () => {
	// State of the response data
	const [data, setData] = useState<ProductPrices[]>([] as ProductPrices[]);

	// Query for fetching product prices and isLoading state
	const { data: result, isFetching: isLoading } = useQuery({
		queryKey: ['pendingProductPrices'],
		queryFn: () => fetchPendingProductPrices(),
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
export const useProductPricesQueryFilterByApproved = () => {
	// Query for fetching product prices and isLoading state
	const { data, isFetching: isLoading } = useQuery({
		queryKey: ['approvedProductPrices'],
		queryFn: () => fetchApprovedProductPrices(),
		refetchOnWindowFocus: false,
	});

	return { data, isLoading };
};

export interface ProductPricesFilterProps {
	approval_status?: string;
	warehouse_id?: number;
}

export const useProductPricesFilter = ({
	warehouse_id,
}: ProductPricesFilterProps) => {
	const { data, isFetching } = useQuery({
		queryKey: ['FilteredProductPrices', warehouse_id],
		queryFn: () => {
			if (warehouse_id) {
				return fetchProductPricesFilters(warehouse_id);
			}
			// Return a placeholder or null if any of the required parameters are missing
			return null;
		},
		refetchOnWindowFocus: false,
	});

	return { data, isFetching };
};

export const useProductPricesPaginatedQuery = ({
	pagination,
	filter,
	sort,
	search,
}: {
	pagination: { page: number; pageSize: number };
	filter?: { warehouse_id?: number };
	sort?: { [key: string]: 'asc' | 'desc' };
	search?: { [key: string]: string | null | undefined };
}) => {
	return useQuery({
		queryKey: ['productPrices', pagination, filter, sort, search],
		queryFn: () =>
			fetchProductPricesPaginated({ pagination, filter, sort, search }),
		placeholderData: keepPreviousData, // Keep previous data when fetching new data to avoid clearing of table data
		refetchOnWindowFocus: false,
	});
};

export const useProductPricesPOSQuery = ({
	warehouse_id,
}: {
	warehouse_id: number;
}) => {
	return useInfiniteQuery({
		queryKey: ['productPrices', warehouse_id],
		queryFn: ({ pageParam }) =>
			fetchProductPricesPaginated({
				pagination: { page: pageParam, pageSize: 150 }, // Page size for POS is defined here; 150 is ideal
				filter: { warehouse_id },
				sort: { created_at: 'desc' },
			}),
		initialPageParam: 1,
		getNextPageParam: page => {
			return page.next_page_url ? page.current_page + 1 : null;
		},
		enabled: !!warehouse_id, // Only fetch data when warehouse_id is provided
		refetchOnWindowFocus: false,
	});
};

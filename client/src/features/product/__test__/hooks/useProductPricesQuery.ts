import { useQuery } from '@tanstack/react-query';
import {
	fetchApprovedProductPrices,
	fetchPendingProductPrices,
	fetchProductPrices,
	fetchProductPricesFilters,
} from '../api/Products';
import { useEffect, useState } from 'react';
import { ProductPrices } from '../types';

interface ProductPricesFilterProps {
	approval_status?: string;
	warehouse_id?: number;
}

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
	const [data, setData] = useState<ProductPrices[]>([] as ProductPrices[]);

	// Query for fetching product prices and isLoading state
	const { data: result, isFetching: isLoading } = useQuery({
		queryKey: ['approvedProductPrices'],
		queryFn: () => fetchApprovedProductPrices(),
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

export const useProductPricesFilter = ({
	approval_status,
	warehouse_id,
}: ProductPricesFilterProps) => {
	const [data, setData] = useState<ProductPrices[]>([]);
	const {
		data: result,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['productPricesTEST', approval_status, warehouse_id], // Include approval_status and warehouse_id in the query key
		queryFn: async () => {
			let filteredData: ProductPrices[] = [];
			try {
				if (approval_status && warehouse_id) {
					filteredData = await fetchProductPricesFilters(
						approval_status,
						warehouse_id,
					);
				} else if (approval_status) {
					filteredData = await fetchProductPricesFilters(approval_status);
				} else if (warehouse_id) {
					filteredData = await fetchProductPricesFilters(
						undefined,
						warehouse_id,
					);
				} else {
					filteredData = await fetchProductPricesFilters();
				}
				return filteredData;
			} catch (error) {
				console.error('Error fetching product prices:', error);
				throw error;
			}
		},
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (result) {
			setData(result);
			refetch();
		}
	}, [result, approval_status, warehouse_id]); // Include approval_status and warehouse_id as dependencies

	// useEffect(() => {
	// 	if (approval_status && warehouse_id) {
	// 		refetch();
	// 	}
	// }, [approval_status, warehouse_id]); // Refetch if approval_status and warehouse_id changes

	return { data, isLoading };
};

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
	approval_status: string;
	warehouse_id: number;
	active_status: string;
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
	active_status,
}: ProductPricesFilterProps) => {
	const [data, setData] = useState<ProductPrices[]>([]);
	const {
		data: result,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['FilteredProductPrices'],
		queryFn: () => {
			if (approval_status && warehouse_id && active_status) {
				return fetchProductPricesFilters(
					approval_status,
					active_status,
					warehouse_id,
				);
			}
			// Return a placeholder or null if any of the required parameters are missing
			return null;
		},
		refetchOnWindowFocus: false,
	});
	useEffect(() => {
		if (!isLoading && result) {
			setData(result);
		}
	}, [result, isLoading]);

	// Refetch data when any of the filter values change
	useEffect(() => {
		refetch();
	}, [approval_status, warehouse_id, active_status, refetch]);

	return { data, isLoading };
};

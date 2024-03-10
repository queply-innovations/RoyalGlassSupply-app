import { useQuery } from '@tanstack/react-query';
import { fetchInventory } from '../api/Inventory';
import { Inventory } from '../types';
import { useEffect, useState } from 'react';

/**
 * Custom hook for fetching inventory.
 *
 * @returns An object containing the response data and loading state.
 */
export const useInventoryQuery = () => {
	// State of the response data and loading state
	const [data, setData] = useState<Inventory[]>([] as Inventory[]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Query for fetching inventory and isLoading state
	const { data: result, isFetching: loading } = useQuery({
		queryKey: ['inventory'],
		queryFn: () => fetchInventory(),
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

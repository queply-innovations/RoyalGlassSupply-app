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
	// State of the response data
	const [data, setData] = useState<Inventory[]>([] as Inventory[]);

	// Query for fetching inventory and isLoading state
	const { data: result, isFetching: isLoading } = useQuery({
		queryKey: ['inventory'],
		queryFn: () => fetchInventory(),
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

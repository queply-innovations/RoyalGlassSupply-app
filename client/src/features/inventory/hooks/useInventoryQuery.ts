import { useQuery } from '@tanstack/react-query';
import { fetchInventory, fetchInventoryById } from '../api/Inventory';
import { Inventory } from '../types';
import { useEffect, useState } from 'react';

/**
 * Custom hook for fetching inventory.
 *
 * @returns List of inventories.
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

/**
 * Custom hook for fetching inventory by id.
 *
 * @param id - The id of the inventory to fetch.
 * @returns Inventory object.
 */
export const useInventoryQueryById = (id: number) => {
	// Query for fetching inventory and isLoading state
	const { data, isFetching: isLoading } = useQuery({
		queryKey: ['inventory'],
		queryFn: () => fetchInventoryById(id),
		refetchOnWindowFocus: false,
	});

	return { data, isLoading };
};

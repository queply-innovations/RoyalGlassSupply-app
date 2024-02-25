import { useQuery } from '@tanstack/react-query';
import { fetchWarehouses } from '../api/Warehouse';
import { useEffect, useState } from 'react';
import { Warehouse } from '../types';

// Custom hook for fetching and managing warehouse data
export const useWarehouseQuery = () => {
	// State to store warehouse data
	const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

	// Query for fetching warehouse data
	const { isFetching, data: warehouseQuery } = useQuery({
		// Key for identifying this query
		queryKey: ['warehouses'],
		// Function to fetch warehouse data
		queryFn: () => fetchWarehouses(),
		// Disable refetching
		refetchOnWindowFocus: false,
	});

	// Effect to update state when warehouse query changes
	useEffect(() => {
		// Destructure data from warehouseQuery object
		const warehouse = warehouseQuery;
		if (warehouse) {
			// Update state with fetched warehouse data
			setWarehouses(warehouse);
		}
		// Dependency array to trigger effect when warehouseQuery changes
	}, [warehouseQuery]);

	// Return state and query object
	return { warehouses, warehouseQuery, isFetching };
};

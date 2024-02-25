import { useQuery } from '@tanstack/react-query';
import { fetchSuppliers } from '../api/Supplier';
import { Supplier } from '../../types';
import { useEffect, useState } from 'react';

// Custom hook for fetching and managing supplier data
export const useSupplierQuery = () => {
	// State to store supplier data
	const [suppliers, setSuppliers] = useState<Supplier[]>([]);

	// Query for fetching supplier data
	const { isFetching, data: supplierQuery } = useQuery({
		// Key for identifying this query
		queryKey: ['supplier'],
		// Function to fetch supplier data
		queryFn: () => fetchSuppliers(),
		// Disable refetching
		refetchOnWindowFocus: false,
	});

	// Effect to update state when supplier query changes
	useEffect(() => {
		// Destructure data from supplierQuery object
		const supplier = supplierQuery;
		if (supplier) {
			// Update state with fetched supplier data
			setSuppliers(supplier);
		}
		// Dependency array to trigger effect when warehouseQuery changes
	}, [supplierQuery]);

	// Return state and query object
	return { suppliers, supplierQuery, isFetching };
};
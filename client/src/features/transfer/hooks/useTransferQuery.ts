import { useQuery } from '@tanstack/react-query';
import { fetchTransferProducts, fetchTransfers } from '../api/Transfer';
import { useEffect, useState } from 'react';
import { Transfer, TransferProduct, TransferProductFull } from '../types';

// Custom hook for fetching and managing data
export const useTransferQuery = () => {
	// State to store data
	const [transfers, setTransfers] = useState<Transfer[]>([]);
	const [transferProducts, setTransferProducts] = useState<TransferProductFull[]>([]);

	const [progress, setProgress] = useState(0);

	// Query for fetching data
	const { isFetching, data: transferQuery } = useQuery({
		// Key for identifying this query
		queryKey: ['transfers'],
		// Function to fetch data
		queryFn: () => fetchTransfers(setProgress),
		// Disable refetching
		refetchOnWindowFocus: false,
	});

	// Effect to update state when query changes
	useEffect(() => {
		// Destructure data
		const transfers = transferQuery;
		if (transfers) {
			// Update state with fetched data
			setTransfers(transfers);
		}
		// Dependency array to trigger effect when Query changes
	}, [transferQuery]);

	const { data: transferProductsQuery } = useQuery({
		queryKey: ['transfer_products'],
		queryFn: () => fetchTransferProducts(),
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		const transferProducts = transferProductsQuery;
		if (transferProducts) {
			setTransferProducts(transferProducts);
		}
	}, [transferProductsQuery]);

	// Return state and query object
	return { transfers, transferQuery, transferProducts, transferProductsQuery, isFetching, progress };
};

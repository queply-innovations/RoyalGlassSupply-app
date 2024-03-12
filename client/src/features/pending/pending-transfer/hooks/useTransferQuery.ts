import { useQuery } from '@tanstack/react-query';
import { fetchTransfers } from '../api/PendingTransfer';
import { useEffect, useState } from 'react';
import { Transfer } from '../types';

// Custom hook for fetching and managing data
export const useTransferQuery = () => {
	// State to store data
	const [transfers, setTransfers] = useState<Transfer[]>([]);

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

	// Return state and query object
	return { transfers, transferQuery, isFetching, progress };
};

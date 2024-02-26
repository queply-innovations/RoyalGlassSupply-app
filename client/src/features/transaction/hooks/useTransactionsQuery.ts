import { useQuery } from '@tanstack/react-query';
import { fetchTransactions } from '../api/Transaction';
import { useEffect, useState } from 'react';
import { Transaction } from '../types';

// Custom hook for fetching and managing user info data
export const useTransactionQuery = () => {
	// State to store user info data
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	// Query for fetching user info data
	const { isFetching, data: transactionQuery } = useQuery({
		// Key for identifying this query
		queryKey: ['transactions'],
		// Function to fetch user info data
		queryFn: () => fetchTransactions(),
		// Disable refetching
		refetchOnWindowFocus: false,
	});

	// Effect to update state when user info query changes
	useEffect(() => {
		// Destructure data from userQuery object
		const transactions = transactionQuery;
		if (transactions) {
			// Update state with fetched user info data
			setTransactions(transactions);
		}
		// Dependency array to trigger effect when userQuery changes
	}, [transactionQuery]);

	// Return state and query object
	return { transactions, transactionQuery, isFetching };
};
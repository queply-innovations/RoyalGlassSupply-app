import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ReturnTransactionsRaw } from '../types';
import {
	fetchPendingReturnTransactions,
	fetchReturnTransactions,
} from '../api/ReturnTransactions';

export const useReturnQuery = () => {
	const [returns, setReturns] = useState<ReturnTransactionsRaw[]>([]);

	const { isFetching, data: returnsQuery } = useQuery({
		queryKey: ['returns'],
		queryFn: fetchReturnTransactions,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		const returns = returnsQuery;
		if (returns) {
			setReturns(returns);
		}
	}, [returnsQuery]);

	return { returns, returnsQuery, isFetching };
};

export const usePendingReturnQuery = () => {
	const { isFetching, data: returns } = useQuery({
		queryKey: ['pending_returns'],
		queryFn: fetchPendingReturnTransactions,
		refetchOnWindowFocus: false,
	});

	return { returns, isFetching };
};

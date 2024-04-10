import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ReturnTransactions, ReturnTransactionsRaw } from "../types";
import { fetchReturnTransactions } from "../api/ReturnTransactions";

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
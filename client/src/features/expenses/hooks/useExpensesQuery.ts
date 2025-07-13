import { useQuery } from '@tanstack/react-query';
import {
	fetchExpenses
} from '../api/Expenses';
import { ExpensesRaw } from '../types';
import { useEffect, useState } from 'react';

export const useExpensesQuery = () => {
	const [expenses, setExpenses] = useState<ExpensesRaw[]>([]);

	const { isFetching, data: expensesQuery } = useQuery({
		queryKey: ['expenses'],
		queryFn: fetchExpenses,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		const expenses = expensesQuery;
		if (expenses) {
			setExpenses(expenses);
		}
	}, [expensesQuery]);

	return { expenses, expensesQuery, isFetching };
};

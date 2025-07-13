import { ReactNode, createContext, useContext, useState } from 'react';
import { ExpensesRaw } from '../types';
import { useExpensesQuery } from '../hooks';

interface ExpensesContextProps {
	expenses: ExpensesRaw[];
	isFetching: boolean;
	selectedExpenses: ExpensesRaw;
	setSelectedExpenses: (expenses: ExpensesRaw) => void;
	dateToday: string;
}

interface ExpensesProviderProps {
	children: ReactNode;
}

const ExpensesContext = createContext<ExpensesContextProps | undefined>(
	undefined,
);
export const ExpensesProvider = ({ children }: ExpensesProviderProps) => {
	// State of the selected inventory
	const [selectedExpenses, setSelectedExpenses] = useState<ExpensesRaw>(
		{} as ExpensesRaw,
	);
	// Destructured response data and loading state from useInventoryQuery hook
	const { expenses, expensesQuery, isFetching } = useExpensesQuery();
	const dateToday = new Date().toISOString().split('T')[0];

	const value = {
		expenses,
		isFetching,
		selectedExpenses,
		setSelectedExpenses,
		dateToday
	};

	return (
		<ExpensesContext.Provider value={value}>
			{children}
		</ExpensesContext.Provider>
	);
};

export function useExpenses() {
	const context = useContext(ExpensesContext);

	if (!context) {
		throw new Error(
			'useExpenses hook must be used within ExpensesProvider',
		);
	}
	return context;
}

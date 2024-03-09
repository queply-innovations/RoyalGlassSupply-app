import { ReactNode, createContext, useContext } from 'react';
import { Transaction } from '../types';
import { useTransactionQuery } from '../hooks';

interface TransactionContextProps {
	transactions: Transaction[];
	isFetching: boolean;
	progress: any;
}

export const TransactionContext = createContext<TransactionContextProps | undefined>(
	undefined,
);

interface TransactionProviderProps {
	children: ReactNode;
}

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
	const { transactions, isFetching, progress } = useTransactionQuery();

	const value = { transactions, isFetching, progress };

	return (
		<TransactionContext.Provider value={value}>
			{children}
		</TransactionContext.Provider>
	);
};

export function useTransaction() {
	const context = useContext(TransactionContext);

	if (!context) {
		throw new Error(
			'useTransactionContext must be used within TransactionContext',
		);
	}
	return context;
}

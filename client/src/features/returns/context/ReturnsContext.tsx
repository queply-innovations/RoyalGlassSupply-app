import { createContext, useContext, useState } from 'react';
import { ReturnTransactions } from '../types';
import { useReturnsQuery } from '../hooks/useReturnsQuery';

interface ReturnsContextProps {
	data: ReturnTransactions[] | undefined;
	isFetching: boolean;
	selectedReturn: ReturnTransactions;
	setSelectedReturn: React.Dispatch<React.SetStateAction<ReturnTransactions>>;
}

interface ReturnsProviderProps {
	children: React.ReactNode;
}

const ReturnsContext = createContext<ReturnsContextProps | undefined>(
	undefined,
);

export const ReturnsProvider = ({ children }: ReturnsProviderProps) => {
	const [selectedReturn, setSelectedReturn] = useState<ReturnTransactions>(
		{} as ReturnTransactions,
	);
	const { data, isFetching } = useReturnsQuery();
	const value = {
		data,
		isFetching,
		selectedReturn,
		setSelectedReturn,
	};

	return (
		<ReturnsContext.Provider value={value}>
			{children}
		</ReturnsContext.Provider>
	);
};

export function useReturns() {
	const context = useContext(ReturnsContext);

	if (!context) {
		throw new Error('useReturns hook must be used within ReturnsProvider');
	}
	return context;
}

import { ReactNode, createContext, useContext, useState } from 'react';
import { usePendingReturnQuery } from '../hooks';
import { ReturnTransactionsRaw } from '../types';

interface ReturnContextProps {
	returns: ReturnTransactionsRaw[] | undefined;
	isFetching: boolean;
	selectedReturn: ReturnTransactionsRaw;
	setSelectedReturn: (selectedReturn: ReturnTransactionsRaw) => void;
}

export const ReturnContext = createContext<ReturnContextProps | undefined>(
	undefined,
);

interface ReturnProviderProps {
	children: ReactNode;
}

export const ReturnProvider = ({ children }: ReturnProviderProps) => {
	const { returns, isFetching } = usePendingReturnQuery();
	// State of the selected transfer
	const [selectedReturn, setSelectedReturn] = useState<ReturnTransactionsRaw>(
		{} as ReturnTransactionsRaw,
	);

	const value = {
		returns,
		selectedReturn,
		setSelectedReturn,
		isFetching,
	};

	return (
		<ReturnContext.Provider value={value}>{children}</ReturnContext.Provider>
	);
};

export function useReturn() {
	const context = useContext(ReturnContext);

	if (!context) {
		throw new Error('useReturnContext must be used within ReturnContext');
	}
	return context;
}

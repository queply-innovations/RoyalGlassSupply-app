import { ReactNode, createContext, useContext } from 'react';
import { Transfer } from '../types';
import { useTransferQuery } from '../hooks';

interface TransferContextProps {
	transfers: Transfer[];
	isFetching: boolean;
}

export const TransferContext = createContext<TransferContextProps | undefined>(
	undefined,
);

interface TransferProviderProps {
	children: ReactNode;
}

export const TransferProvider = ({ children }: TransferProviderProps) => {
	const { transfers, isFetching } = useTransferQuery();

	const value = { transfers, isFetching };

	return (
		<TransferContext.Provider value={value}>
			{children}
		</TransferContext.Provider>
	);
};

export function useTransfer() {
	const context = useContext(TransferContext);

	if (!context) {
		throw new Error(
			'useTransferContext must be used within TransferContext',
		);
	}
	return context;
}

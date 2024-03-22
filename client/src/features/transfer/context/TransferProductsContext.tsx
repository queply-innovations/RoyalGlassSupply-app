import { ReactNode, createContext, useContext, useState } from 'react';
import { Transfer, TransferProduct } from '../types';
import { useTransferQuery } from '../hooks';

interface TransferProductsContextProps {
	transfers: Transfer[];
	transferProducts: TransferProduct[];
	isFetching: boolean;
	selectedTransfer2: Transfer;
	setSelectedTransfer2: (transfer: Transfer) => void;
}

export const TransferProductsContext = createContext<TransferProductsContextProps | undefined>(
	undefined,
);

interface TransferProductsProviderProps {
	children: ReactNode;
}

export const TransferProductsProvider = ({ children }: TransferProductsProviderProps) => {
	// State of the selected transfer
	const [selectedTransfer2, setSelectedTransfer2] =
		useState<Transfer>({} as Transfer);

	const { transfers, transferProducts, isFetching } = useTransferQuery();

	const value = { 
		transfers,
		transferProducts, 
		isFetching, 
		selectedTransfer2, 
		setSelectedTransfer2 
	};

	return (
		<TransferProductsContext.Provider value={value}>
			{children}
		</TransferProductsContext.Provider>
	);
};

export function useTransferProducts() {
	const context = useContext(TransferProductsContext);

	if (!context) {
		throw new Error(
			'useTransferProductsContext must be used within TransferContext',
		);
	}
	return context;
}

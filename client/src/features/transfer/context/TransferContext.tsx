import { ReactNode, createContext, useContext, useState } from 'react';
import { Transfer, TransferProduct, TransferProductFull } from '../types';
import { useTransferQuery } from '../hooks';

interface TransferContextProps {
	transfers: Transfer[];
	transferProducts: TransferProductFull[];
	isFetching: boolean;
	progress: any;
	selectedTransfer: Transfer;
	setSelectedTransfer: (transfer: Transfer) => void;
	selectedProduct: TransferProductFull;
	setSelectedProduct: (product: TransferProductFull) => void;
}

export const TransferContext = createContext<TransferContextProps | undefined>(
	undefined,
);

interface TransferProviderProps {
	children: ReactNode;
}

export const TransferProvider = ({ children }: TransferProviderProps) => {
	// State of the selected transfer
	const [selectedTransfer, setSelectedTransfer] =
		useState<Transfer>({} as Transfer);
	const [selectedProduct, setSelectedProduct] =
		useState<TransferProductFull>({} as TransferProductFull);

	const { transfers, transferProducts, isFetching, progress } = useTransferQuery();

	const value = { 
		transfers,
		transferProducts, 
		isFetching, 
		progress, 
		selectedTransfer, 
		setSelectedTransfer,
		selectedProduct,
		setSelectedProduct
	};

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

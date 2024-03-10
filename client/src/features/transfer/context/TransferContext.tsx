import { ReactNode, createContext, useContext, useState } from 'react';
import { Transfer } from '../types';
import { useTransferQuery } from '../hooks';

interface TransferContextProps {
	transfers: Transfer[];
	isFetching: boolean;
	progress: any;
	selectedTransfer: Transfer;
	setSelectedTransfer: (transfer: Transfer) => void;
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

	const { transfers, isFetching, progress } = useTransferQuery();

	const value = { 
		transfers, 
		isFetching, 
		progress, 
		selectedTransfer, 
		setSelectedTransfer 
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

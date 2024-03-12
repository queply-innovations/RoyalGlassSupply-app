import { ReactNode, createContext, useContext, useState } from 'react';
import { Transfer } from '../types';
import { useTransferQuery } from '../hooks';

interface PendingTransferContextProps {
	transfers: Transfer[];
	isFetching: boolean;
	progress: any;
	selectedTransfer: Transfer;
	setSelectedTransfer: (transfer: Transfer) => void;
}

export const PendingTransferContext = createContext<PendingTransferContextProps | undefined>(
	undefined,
);

interface PendingTransferProviderProps {
	children: ReactNode;
}

export const PendingTransferProvider = ({ children }: PendingTransferProviderProps) => {
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
		<PendingTransferContext.Provider value={value}>
			{children}
		</PendingTransferContext.Provider>
	);
};

export function usePendingTransfer() {
	const context = useContext(PendingTransferContext);

	if (!context) {
		throw new Error(
			'usePendingTransferContext must be used within PendingTransferContext',
		);
	}
	return context;
}

import React, { createContext, useContext, useEffect, useState } from 'react';
import { TransferDatabaseAdd } from '../types';
import { useAuth } from '@/context/AuthContext';

interface NewTransferContextProps {
	newTransfer: TransferDatabaseAdd;
	setNewTransfer: React.Dispatch<React.SetStateAction<TransferDatabaseAdd>>;
	handleChange: <K extends keyof TransferDatabaseAdd>(
		key: K,
		value: TransferDatabaseAdd[K],
	) => void;
	activeTab: 'details' | 'items' | string;
	setActiveTab: React.Dispatch<
		React.SetStateAction<'details' | 'items' | string>
	>;
}

export const NewTransferContext = createContext<
	NewTransferContextProps | undefined
>(undefined);

interface NewTransferProviderProps {
	children: React.ReactNode;
}

export const NewTransferProvider = ({ children }: NewTransferProviderProps) => {
	const { auth } = useAuth();

	// state to store the new transfer
	const [newTransfer, setNewTransfer] = useState<TransferDatabaseAdd>({
		created_by: auth.user.id,
	} as TransferDatabaseAdd);

	// handles the change of the new transfer state
	const handleChange = <K extends keyof TransferDatabaseAdd>(
		key: K,
		value: TransferDatabaseAdd[K],
	) => {
		setNewTransfer(prev => ({ ...prev, [key]: value }));
	};

	// active tab handling
	const [activeTab, setActiveTab] = useState<'details' | 'items' | string>(
		'details',
	);

	useEffect(() => {
		console.log(newTransfer);
	}, [newTransfer]);

	const value = {
		newTransfer,
		setNewTransfer,
		handleChange,
		activeTab,
		setActiveTab,
	};

	return (
		<NewTransferContext.Provider value={value}>
			{children}
		</NewTransferContext.Provider>
	);
};

export function useNewTransfer() {
	const context = useContext(NewTransferContext);

	if (!context) {
		throw new Error(
			'useNewTransfer must be used within a NewTransferProvider',
		);
	}

	return context;
}

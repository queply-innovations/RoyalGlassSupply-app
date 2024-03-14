import { ReactNode, createContext, useContext, useState } from 'react';
import { Inventory } from '../types';
import { useInventoryQuery } from '../hooks';

interface InventoryContextProps {
	data: Inventory[];
	isLoading: boolean;
	selectedInventory: Inventory;
	setSelectedInventory: (inventory: Inventory) => void;
}

interface InventoryProviderProps {
	children: ReactNode;
}

const InventoryContext = createContext<InventoryContextProps | undefined>(
	undefined,
);
export const InventoryProvider = ({ children }: InventoryProviderProps) => {
	// State of the selected inventory
	const [selectedInventory, setSelectedInventory] = useState<Inventory>(
		{} as Inventory,
	);
	// Destructured response data and loading state from useInventoryQuery hook
	const { data, isLoading } = useInventoryQuery();
	const value = {
		data,
		isLoading,
		selectedInventory,
		setSelectedInventory,
	};

	return (
		<InventoryContext.Provider value={value}>
			{children}
		</InventoryContext.Provider>
	);
};

export function useInventory() {
	const context = useContext(InventoryContext);

	if (!context) {
		throw new Error(
			'useInventory hook must be used within InventoryProvider',
		);
	}
	return context;
}

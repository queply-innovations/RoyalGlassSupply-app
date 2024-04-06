import { createContext, useContext, useState } from 'react';
import { Inventory } from '@/features/inventory/types';
import { useInventoryQuery } from '@/features/inventory/hooks';

interface AddProductPosContextProps {
	inventories: Inventory[];
	isInventoriesLoading: boolean;
	selectedInventory: Inventory | undefined;
	setSelectedInventory: React.Dispatch<
		React.SetStateAction<Inventory | undefined>
	>;
	activeTab: string | undefined;
	setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

interface AddProductPosProviderProps {
	children: React.ReactNode;
}

const AddProductPosContext = createContext<
	AddProductPosContextProps | undefined
>(undefined);

export const AddProductPosProvider = ({
	children,
}: AddProductPosProviderProps) => {
	// Active tab in the menu
	const [activeTab, setActiveTab] = useState<string>('main');

	const [selectedInventory, setSelectedInventory] = useState<
		Inventory | undefined
	>();

	const { data: inventories, isLoading: isInventoriesLoading } =
		useInventoryQuery();

	const value = {
		inventories,
		isInventoriesLoading,
		selectedInventory,
		setSelectedInventory,
		activeTab,
		setActiveTab,
	};

	return (
		<AddProductPosContext.Provider value={value}>
			{children}
		</AddProductPosContext.Provider>
	);
};

export function useAddProductPos() {
	const context = useContext(AddProductPosContext);

	if (!context) {
		throw new Error(
			'useAddProductPos hook must be used within AddProductPosProvider',
		);
	}

	return context;
}

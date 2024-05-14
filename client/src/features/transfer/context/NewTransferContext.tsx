import React, { createContext, useContext, useEffect, useState } from 'react';
import { TransferDatabaseAdd } from '../types';
import { useAuth } from '@/context/AuthContext';
import {
	fetchInventoryByWarehouseId,
	fetchInventoryProductById,
} from '@/features/inventory/api/Inventory';
import { Inventory, InventoryProduct } from '@/features/inventory/types';

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

	inventoriesList: Inventory[];
	inventoriesLoading: boolean;
	selectedInventory: Inventory | null;
	setSelectedInventory: React.Dispatch<React.SetStateAction<Inventory | null>>;

	inventoryProducts: InventoryProduct[];
	inventoryProductsLoading: boolean;
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

	// state to store the inventories list
	const [inventoriesList, setInventoriesList] = useState<Inventory[]>([]);
	const [inventoriesLoading, setInventoriesLoading] = useState<boolean>(false);
	// state to store the selected inventory
	const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(
		null,
	);
	// fetch inventories by warehouse id if source is selected
	useEffect(() => {
		if (newTransfer.source) {
			setInventoriesList([]); // clear the inventories list
			setSelectedInventory(null); // clear the selected inventory
			setInventoryProducts([]); // clear the inventory products
			setInventoriesLoading(true); // set loading to true
			fetchInventoryByWarehouseId(newTransfer.source)
				.then(res => {
					setInventoriesList(res);
					setInventoriesLoading(false);
				})
				.catch(err => {
					console.log(err);
					setInventoriesLoading(false);
				});
		}
	}, [newTransfer.source]);

	// fetch inventory products by inventory id if selectedInventory is selected
	const [inventoryProducts, setInventoryProducts] = useState<
		InventoryProduct[]
	>([]);
	const [inventoryProductsLoading, setInventoryProductsLoading] =
		useState<boolean>(false);
	// fetch inventory products by inventory id if selectedInventory is selected
	useEffect(() => {
		if (selectedInventory) {
			setInventoryProducts([]); // clear the inventory products
			setInventoryProductsLoading(true); // set loading to true
			fetchInventoryProductById(selectedInventory.id)
				.then(res => {
					setInventoryProducts(res);
					setInventoryProductsLoading(false);
				})
				.catch(err => {
					console.log(err);
					setInventoryProductsLoading(false);
				});
		}
	}, [selectedInventory]);

	useEffect(() => {
		console.log('inventories', inventoriesList);
	}, [inventoriesList]);

	const value = {
		newTransfer,
		setNewTransfer,
		handleChange,
		activeTab,
		setActiveTab,
		inventoriesList,
		inventoriesLoading,
		selectedInventory,
		setSelectedInventory,
		inventoryProducts,
		inventoryProductsLoading,
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

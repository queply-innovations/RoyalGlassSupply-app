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

	inventoriesList: { source: Inventory[]; destination: Inventory[] };
	inventoriesLoading: { source: boolean; destination: boolean };
	selectedInventory: {
		source: Inventory | null;
		destination: Inventory | null;
	};
	setSelectedInventory: React.Dispatch<
		React.SetStateAction<{
			source: Inventory | null;
			destination: Inventory | null;
		}>
	>;

	inventoryProducts: {
		source: InventoryProduct[];
		destination: InventoryProduct[];
	};
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
		transferItems: [],
	} as unknown as TransferDatabaseAdd);

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

	// state to store the inventories list
	const [inventoriesList, setInventoriesList] = useState<{
		source: Inventory[];
		destination: Inventory[];
	}>({ source: [], destination: [] });

	const [inventoriesLoading, setInventoriesLoading] = useState<{
		source: boolean;
		destination: boolean;
	}>({ source: false, destination: false });
	// state to store the selected inventory
	const [selectedInventory, setSelectedInventory] = useState<{
		source: Inventory | null;
		destination: Inventory | null;
	}>({
		source: null,
		destination: null,
	});

	// fetch inventories by warehouse id if source is selected
	useEffect(() => {
		if (newTransfer.source) {
			setInventoriesList(previous => {
				return { ...previous, source: [] };
			}); // clear the inventories list
			setSelectedInventory(previous => {
				return { ...previous, source: null };
			}); // clear the selected inventory
			setInventoryProducts(previous => {
				return { ...previous, source: [] };
			}); // clear the inventory products
			setInventoriesLoading(previous => {
				return { ...previous, source: true };
			}); // set loading to true
			fetchInventoryByWarehouseId(newTransfer.source)
				.then(res => {
					setInventoriesList(previous => {
						return { ...previous, source: res };
					});
					setInventoriesLoading(previous => {
						return { ...previous, source: false };
					});
				})
				.catch(err => {
					console.log(err);
					setInventoriesLoading(previous => {
						return { ...previous, source: false };
					});
				});
		}
	}, [newTransfer.source]);

	useEffect(() => {
		if (newTransfer.destination) {
			setInventoriesList(previous => {
				return { ...previous, destination: [] };
			}); // clear the inventories list
			setSelectedInventory(previous => {
				return { ...previous, source: null };
			}); // clear the selected inventory
			setInventoryProducts(previous => {
				return { ...previous, destination: [] };
			}); // clear the inventory products
			setInventoriesLoading(previous => {
				return { ...previous, destination: true };
			}); // set loading to true
			fetchInventoryByWarehouseId(newTransfer.destination)
				.then(res => {
					setInventoriesList(previous => {
						return { ...previous, destination: res };
					});
					setInventoriesLoading(previous => {
						return { ...previous, destination: false };
					});
				})
				.catch(err => {
					console.log(err);
					setInventoriesLoading(previous => {
						return { ...previous, destination: false };
					});
				});
		}
	}, [newTransfer.destination]);

	// fetch inventory products by inventory id if selectedInventory is selected
	const [inventoryProducts, setInventoryProducts] = useState<{
		source: InventoryProduct[];
		destination: InventoryProduct[];
	}>({ source: [], destination: [] });
	const [inventoryProductsLoading, setInventoryProductsLoading] =
		useState<boolean>(false);
	// fetch inventory products by inventory id if selectedInventory is selected
	useEffect(() => {
		if (selectedInventory.source) {
			setInventoryProducts(previous => {
				return { ...previous, source: [] };
			}); // clear the inventory products
			setInventoryProductsLoading(true); // set loading to true
			fetchInventoryProductById(selectedInventory.source?.id as number)
				.then(res => {
					setInventoryProducts(previous => {
						return { ...previous, source: res };
					});
					setInventoryProductsLoading(false);
				})
				.catch(err => {
					console.log(err);
					setInventoryProductsLoading(false);
				});
		}
	}, [selectedInventory.source]);

	// useEffect(() => {
	// 	console.log('inventories', inventoriesList);
	// }, [inventoriesList]);

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

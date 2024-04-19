import { ReactNode, createContext, useContext, useState } from 'react';
import { InventoryProduct } from '../types';
import { useInventoryProductByIdQuery } from '../hooks/useInventoryProdsQuery';

interface InventoryProductsByInventoryContextProps {
	data: InventoryProduct[];
	isLoading: boolean;
	selectedInventoryProduct: InventoryProduct;
	setSelectedInventoryProduct: (inventoryProduct: InventoryProduct) => void;
}

interface InventoryProductsByInventoryProviderProps {
	children: ReactNode;
	inventoryId: number;
}

const InventoryProdsInventoryProductsByInventoryContext = createContext<
	InventoryProductsByInventoryContextProps | undefined
>(undefined);

export const InventoryProductsByInventoryProvider = ({
	children,
	inventoryId,
}: InventoryProductsByInventoryProviderProps) => {
	const [selectedInventoryProduct, setSelectedInventoryProduct] =
		useState<InventoryProduct>({} as InventoryProduct);

	const { data, isLoading } = useInventoryProductByIdQuery(inventoryId);
	const value = {
		data,
		isLoading,
		selectedInventoryProduct,
		setSelectedInventoryProduct,
	};

	return (
		<InventoryProdsInventoryProductsByInventoryContext.Provider value={value}>
			{children}
		</InventoryProdsInventoryProductsByInventoryContext.Provider>
	);
};

export function useInventoryProductsByInventory() {
	const context = useContext(
		InventoryProdsInventoryProductsByInventoryContext,
	);

	if (!context) {
		throw new Error(
			'useInventoryProductsByInventory hook must be used within InventoryProductsByInventoryProvider',
		);
	}
	return context;
}

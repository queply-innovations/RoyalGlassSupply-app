import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
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
	filter: 'all' | 'no_stock';
}

const InventoryProdsInventoryProductsByInventoryContext = createContext<
	InventoryProductsByInventoryContextProps | undefined
>(undefined);

export const InventoryProductsByInventoryProvider = ({
	children,
	inventoryId,
	filter,
}: InventoryProductsByInventoryProviderProps) => {
	const [selectedInventoryProduct, setSelectedInventoryProduct] =
		useState<InventoryProduct>({} as InventoryProduct);

	const { data: inventoryProducts, isLoading } =
		useInventoryProductByIdQuery(inventoryId);

	const data = useMemo(() => {
		if (filter === 'no_stock') {
			return inventoryProducts.filter(
				item => item.remaining_stocks_count === 0,
			);
		}
		return inventoryProducts;
	}, [filter, inventoryProducts]);

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

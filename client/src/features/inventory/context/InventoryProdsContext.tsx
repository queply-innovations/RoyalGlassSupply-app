import { ReactNode, createContext, useContext, useState } from 'react';
import { InventoryProduct } from '../types';
import { useInventoryProductsQuery } from '../hooks/useInventoryProdsQuery';

interface InventoryProdsContextProps {
	data: InventoryProduct[];
	isLoading: boolean;
	selectedInventoryProduct: InventoryProduct;
	setSelectedInventoryProduct: (inventoryProduct: InventoryProduct) => void;
}

interface InventoryProdsProviderProps {
	children: ReactNode;
}

const InventoryProdsContext = createContext<
	InventoryProdsContextProps | undefined
>(undefined);

export const InventoryProdsProvider = ({
	children,
}: InventoryProdsProviderProps) => {
	const [selectedInventoryProduct, setSelectedInventoryProduct] =
		useState<InventoryProduct>({} as InventoryProduct);

	const { data, isLoading } = useInventoryProductsQuery();
	const value = {
		data,
		isLoading,
		selectedInventoryProduct,
		setSelectedInventoryProduct,
	};

	return (
		<InventoryProdsContext.Provider value={value}>
			{children}
		</InventoryProdsContext.Provider>
	);
};

export function useInventoryProds() {
	const context = useContext(InventoryProdsContext);

	if (!context) {
		throw new Error(
			'useInventoryProds hook must be used within InventoryProdsProvider',
		);
	}
	return context;
}

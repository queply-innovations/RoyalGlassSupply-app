import { usePendingInventoryProductQuery } from '@/features/inventory/hooks';
import { InventoryProduct } from '@/features/inventory/types';
import { createContext, useContext, useState } from 'react';

interface PendingInventoryProductContextProps {
	data: InventoryProduct[] | undefined;
	isLoading: boolean;
	selectedInventoryProduct: InventoryProduct | undefined;
	setSelectedInventoryProduct: React.Dispatch<
		React.SetStateAction<InventoryProduct | undefined>
	>;
}

interface PendingInventoryProductProviderProps {
	children: React.ReactNode;
}

const PendingInventoryProductContext = createContext<
	PendingInventoryProductContextProps | undefined
>(undefined);

export const PendingInventoryProductProvider = ({
	children,
}: PendingInventoryProductProviderProps) => {
	const [selectedInventoryProduct, setSelectedInventoryProduct] =
		useState<InventoryProduct>();

	const { data, isLoading } = usePendingInventoryProductQuery();

	const value = {
		data,
		isLoading,
		selectedInventoryProduct,
		setSelectedInventoryProduct,
	};

	return (
		<PendingInventoryProductContext.Provider value={value}>
			{children}
		</PendingInventoryProductContext.Provider>
	);
};

export function usePendingInventoryProduct() {
	const context = useContext(PendingInventoryProductContext);

	if (!context) {
		throw new Error(
			'usePendingInventoryProduct hook must be used within PendingInventoryProductProvider',
		);
	}
	return context;
}

import { usePendingInventoryProductQuery } from '@/features/inventory/hooks';
import { InventoryProduct } from '@/features/inventory/types';
import { createContext, useContext, useMemo, useState } from 'react';

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

	const { data: inventoryProds, isLoading } =
		usePendingInventoryProductQuery();
	const data = useMemo(() => {
		return inventoryProds?.filter(product => {
			return (
				// Check if product has total inventory of more than 0.
				// Then show if sold count is equal to approved stocks, given there are still unapproved stocks.
				product.total_count > 0 &&
				product.sold_count === product.approved_stocks &&
				product.remaining_unapproved_stocks > 0
			);
		});
	}, [inventoryProds]);

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

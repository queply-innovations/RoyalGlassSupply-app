import {
	usePendingInventoryProductQuery,
	useInventoryProductsQuery,
} from '@/features/inventory/hooks';
import { InventoryProduct } from '@/features/inventory/types';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface PendingInventoryProductContextProps {
	data: InventoryProduct[];
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

	// const { data, isLoading } = usePendingInventoryProductQuery(); // wala pa na implement sa /searches-filters-sorts ang filter sa pending
	const { data: inventoryProducts, isLoading } = useInventoryProductsQuery(); // remove ra ni if na implement na ang filter sa pending
	const data = useMemo(() => {
		return inventoryProducts.filter(
			item =>
				(item.approved_stocks === 0 &&
					item.sold_count === 0 &&
					item.total_count > 0) ||
				(item.approved_stocks === item.sold_count &&
					item.stocks_count !== item.sold_count &&
					item.total_count > 0),
		);
	}, [inventoryProducts]);

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

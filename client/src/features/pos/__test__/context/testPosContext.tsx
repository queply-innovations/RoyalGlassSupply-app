import {
	useInventoryQuery,
	useInventoryProductsQuery,
	useInventoryQueryByWarehouseId,
} from '@/features/inventory/hooks';

import { Inventory, InventoryProduct } from '@/features/inventory/types';
import { Warehouse } from '@/features/warehouse/__test__/types';
import { ReactNode, createContext, useState } from 'react';
import { Items } from '../types';

interface PosContextProps {
	selectedWarehouse: Partial<Warehouse>;
	setSelectedWarehouse: (warehouse: Partial<Warehouse>) => void;

	inventory: Inventory[];
	inventoryProducts: InventoryProduct[];

	handleQuantity: (
		productId: number,
		newQuantity: number,
		maxQuantity: number,
	) => void;

	selectedProducts: InventoryProduct[];
	setSelectedProducts: (product: InventoryProduct[]) => void;
}

interface PosProviderProps {
	children: ReactNode;
}
const PosContext = createContext<PosContextProps | undefined>(undefined);
export const PosProvider = ({ children }: PosProviderProps) => {
	const [selectedWarehouse, setSelectedWarehouse] = useState<
		Partial<Warehouse>
	>({ id: 1, code: 'CDO' } as Warehouse);

	const { data: inventories, isLoading: inventoryQueryLoading } =
		useInventoryQueryByWarehouseId(selectedWarehouse.id || 1);

	const { data: inventoryProducts, isLoading: inventoryItemsQueryLoading } =
		useInventoryProductsQuery();

	const [selectedProducts, setSelectedProducts] = useState<Items[]>([]);

	function handleQuantity(
		productId: number,
		newQuantity: number,
		maxQuantity: number,
	) {
		if (newQuantity > 0 && newQuantity <= maxQuantity) {
			setSelectedProducts(prevSelectedProducts =>
				prevSelectedProducts.map((item, index) => {
					if (index === productId) {
						// Ensure that `price` property exists and is a number
						if (typeof item.price === 'number') {
							return {
								...item,
								quantity: newQuantity,
								subtotal: item.price * newQuantity,
							};
						}
					}
					return item;
				}),
			);
		} else if (newQuantity === 0) {
			setSelectedProducts(prevSelectedProducts =>
				prevSelectedProducts.filter((_, index) => index !== productId),
			);
		}
	}

	const value = {
		inventory: inventories || [],
		inventoryProducts,
		selectedWarehouse,
		setSelectedWarehouse,
		handleQuantity,
		selectedProducts,
		setSelectedProducts,
	};
	return <PosContext.Provider value={value}>{children}</PosContext.Provider>;
};

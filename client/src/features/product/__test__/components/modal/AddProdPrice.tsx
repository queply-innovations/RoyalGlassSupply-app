import { UseModalProps } from '@/utils/Modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { AddProdPriceProdsTab } from '../forms/AddProdPriceProdsTab';
import { AddProdPriceListingsTab } from '../forms/AddProdPriceListingsTab';
import { useWarehouseQuery } from '@/features/warehouse/__test__/hooks';
import { Inventory, InventoryProduct } from '@/features/inventory/types';
import {
	fetchInventoryByWarehouseId,
	fetchInventoryProductById,
} from '@/features/inventory/api/Inventory';
import { Warehouse } from '@/features/warehouse/__test__/types';

interface AddProductPriceProps {
	onClose: UseModalProps['closeModal'];
}

export const AddProductPrice = ({ onClose }: AddProductPriceProps) => {
	// WAREHOUSES - State and query
	const { warehouses } = useWarehouseQuery();
	const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse>();

	// INVENTORIES - State and query
	// Dependent on selectedWarehouse
	const [inventories, setInventories] = useState<Inventory[]>([]);
	const [selectedInventory, setSelectedInventory] = useState<Inventory>();
	useEffect(() => {
		setInventories([]);
		if (selectedWarehouse) {
			fetchInventoryByWarehouseId(selectedWarehouse.id).then(data => {
				setInventories(data);
			});
		}
	}, [selectedWarehouse]);

	// INVENTORY PRODUCTS - State and query
	// Dependent on selectedInventory
	const [inventoryProducts, setInventoryProducts] = useState<
		InventoryProduct[]
	>([]);
	const [selectedInventoryProduct, setSelectedInventoryProduct] =
		useState<InventoryProduct>();
	useEffect(() => {
		setInventoryProducts([]);
		if (selectedInventory) {
			fetchInventoryProductById(selectedInventory.id).then(data => {
				setInventoryProducts(data);
			});
		}
	}, [selectedInventory]);

	// TABS
	const [openedTab, setOpenedTab] = useState('product');

	return (
		<>
			<Tabs
				defaultValue="product"
				className="min-w-[42rem] max-w-2xl space-y-4"
				value={openedTab}
				onValueChange={value => setOpenedTab(value)}
			>
				<TabsList className="grid h-fit w-full grid-flow-row grid-cols-2 rounded-md bg-slate-200/50">
					<TabsTrigger
						value="product"
						className="rounded-md py-1 text-sm font-semibold text-slate-700"
					>
						Product
					</TabsTrigger>
					<TabsTrigger
						disabled={selectedInventoryProduct ? false : true}
						value="listings"
						className="rounded-md py-1 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						Listing
					</TabsTrigger>
				</TabsList>
				<TabsContent value="product">
					{/* Inventory products tab content */}
					<AddProdPriceProdsTab
						warehouses={warehouses}
						selectedWarehouse={selectedWarehouse}
						setSelectedWarehouse={setSelectedWarehouse}
						inventories={inventories}
						selectedInventory={selectedInventory}
						setSelectedInventory={setSelectedInventory}
						inventoryProducts={inventoryProducts}
						selectedInventoryProduct={selectedInventoryProduct}
						setSelectedInventoryProduct={setSelectedInventoryProduct}
						setOpenedTab={setOpenedTab}
						onClose={onClose}
					/>
				</TabsContent>
				<TabsContent value="listings">
					{/* Listing tab content */}
					{selectedInventoryProduct && (
						<AddProdPriceListingsTab
							selectedWarehouse={selectedWarehouse || ({} as Warehouse)}
							selectedInventory={selectedInventory || ({} as Inventory)}
							selectedInventoryProduct={selectedInventoryProduct}
							setOpenedTab={setOpenedTab}
							onClose={onClose}
						/>
					)}
				</TabsContent>
			</Tabs>
		</>
	);
};

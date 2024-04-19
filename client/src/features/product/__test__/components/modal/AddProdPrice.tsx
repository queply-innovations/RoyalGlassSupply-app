import { UseModalProps } from '@/utils/Modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { AddProdPriceProdsTab } from '../forms/AddProdPriceProdsTab';
import { AddProdPriceListingsTab } from '../forms/AddProdPriceListingsTab';
import { useWarehouseQuery } from '@/features/warehouse/__test__/hooks';
import { Warehouse } from '@/features/warehouse/__test__/types';
import { useProducts } from '../../context/ProductContext';

interface AddProductPriceProps {
	onClose: UseModalProps['closeModal'];
}

export const AddProductPrice = ({ onClose }: AddProductPriceProps) => {
	// WAREHOUSES - State and query
	const { warehouses } = useWarehouseQuery();
	const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse>();

	// PRODUCTS
	const { selectedProduct } = useProducts();

	// TABS
	const [openedTab, setOpenedTab] = useState('product');

	return (
		<>
			<Tabs
				defaultValue="product"
				className="min-w-[840px] max-w-2xl space-y-4"
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
						disabled={!selectedProduct}
						value="listings"
						className="rounded-md py-1 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						Listing
					</TabsTrigger>
				</TabsList>
				<TabsContent value="product">
					{/* Products tab content */}
					<AddProdPriceProdsTab
						warehouses={warehouses}
						selectedWarehouse={selectedWarehouse}
						setSelectedWarehouse={setSelectedWarehouse}
						setOpenedTab={setOpenedTab}
						onClose={onClose}
					/>
				</TabsContent>
				<TabsContent value="listings">
					{/* Listing/pricing tab content */}
					{selectedProduct && (
						<AddProdPriceListingsTab
							selectedWarehouse={selectedWarehouse || ({} as Warehouse)}
							setOpenedTab={setOpenedTab}
							onClose={onClose}
						/>
					)}
				</TabsContent>
			</Tabs>
		</>
	);
};

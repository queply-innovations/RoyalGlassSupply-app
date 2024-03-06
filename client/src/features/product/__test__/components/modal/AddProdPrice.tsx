import { UseModalProps } from '@/utils/Modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProductQuery } from '../../hooks';
import { useState } from 'react';
import { AddProdPriceProdsTab } from '../forms/AddProdPriceProdsTab';
import { AddProdPriceListingsTab } from '../forms/AddProdPriceListingsTab';

import { Product } from '../../types';

interface AddProductPriceProps {
	onClose: UseModalProps['closeModal'];
}

export const AddProductPrice = ({ onClose }: AddProductPriceProps) => {
	const { data, isLoading } = useProductQuery();
	const [openedTab, setOpenedTab] = useState('product');
	const [selectedProduct, setSelectedProduct] = useState<Product>(
		{} as Product,
	);

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
						disabled={selectedProduct.name ? false : true}
						value="listings"
						className="rounded-md py-1 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						Listing
					</TabsTrigger>
				</TabsList>
				<TabsContent value="product">
					{/* Products tab content */}
					<AddProdPriceProdsTab
						products={data}
						selectedProduct={selectedProduct}
						setSelectedProduct={setSelectedProduct}
						isLoading={isLoading}
						setOpenedTab={setOpenedTab}
						onClose={onClose}
					/>
				</TabsContent>
				<TabsContent value="listings">
					{/* Listing tab content */}
					<AddProdPriceListingsTab
						product={selectedProduct}
						setOpenedTab={setOpenedTab}
						onClose={onClose}
					/>
				</TabsContent>
			</Tabs>
		</>
	);
};

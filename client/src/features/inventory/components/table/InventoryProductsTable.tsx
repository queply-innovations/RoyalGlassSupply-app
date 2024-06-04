import { DataTable } from '@/components/Tables/DataTable';
import { InventoryProductsCols } from './columns/InventoryProductsCols';
import { useInventoryProductByIdQuery } from '../../hooks/useInventoryProdsQuery';
import { InventoryProduct } from '../../types';
import { useInventoryProds } from '../../context/InventoryProdsContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useInventory, useInventoryProductsByInventory } from '../../context';
import { Inventory } from '@/features/inventory/types';
import { Button } from '@/components';
import { Printer } from 'lucide-react';

interface InventoryProductsTableProps {
	// id: number;
	openModal: (data: any, action: string) => void;
	inventory: Inventory | undefined;
}

export const InventoryProductsTable = ({
	// id,
	openModal,
	inventory,
}: InventoryProductsTableProps) => {
	// const { data, isLoading } = useInventoryProductByIdQuery(id);
	const { data, isLoading, setSelectedInventoryProduct } =
		useInventoryProductsByInventory();
	// const { setSelectedInventoryProduct } = useInventoryProds();

	const handleAddInventoryProduct = () => {
		openModal({} as InventoryProduct, 'add');
	};

	const handleViewDetails = (inventoryProduct: InventoryProduct) => {
		setSelectedInventoryProduct(inventoryProduct);
		openModal(inventoryProduct, 'view_details');
	};

	const handleEditInventoryProduct = (inventoryProduct: InventoryProduct) => {
		setSelectedInventoryProduct(inventoryProduct);
		openModal(inventoryProduct, 'edit');
	};

	const handleApproveInventoryProduct = (
		inventoryProduct: InventoryProduct,
	) => {
		setSelectedInventoryProduct(inventoryProduct);
		openModal(inventoryProduct, 'approve');
	};

	const handleDeleteInventoryProduct = (
		inventoryProduct: InventoryProduct,
	) => {
		setSelectedInventoryProduct(inventoryProduct);
		openModal(inventoryProduct, 'delete');
	};

	return (
		<TooltipProvider>
			<Button
				fill={isLoading ? 'default' : 'primary'}
				onClick={() => {
					window.api.invSend({
						inventory: inventory,
						products: data,
					});
				}}
				className="ml-4 mt-2 flex h-8 flex-row disabled:cursor-not-allowed disabled:opacity-40"
			>
				<Printer size={26} strokeWidth={2} /> Print Inventory Details
			</Button>

			<DataTable
				columns={InventoryProductsCols({
					handleViewDetails,
					handleEditInventoryProduct,
					handleApproveInventoryProduct,
					handleDeleteInventoryProduct,
				})}
				data={data ? data : []}
				filterWhat={'product_name'}
				dataType={'Items'}
				openModal={handleAddInventoryProduct}
				isLoading={isLoading}
			/>
		</TooltipProvider>
	);
};

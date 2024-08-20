import { DataTable } from '@/components/Tables/DataTable';
import { InventoryProductsCols } from './columns/InventoryProductsCols';
import { InventoryProduct } from '../../types';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useInventoryProductsByInventory } from '../../context';
import { Inventory } from '@/features/inventory/types';
import { Button } from '@/components';
import { Printer } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface InventoryProductsTableProps {
	// id: number;
	openModal: (data: any, action: string) => void;
	inventory: Inventory | undefined;
}

export const InventoryProductsTable = ({
	openModal,
	inventory,
}: InventoryProductsTableProps) => {
	const { permissionListNames } = useAuth();
	const { data, isLoading, setSelectedInventoryProduct } =
		useInventoryProductsByInventory();

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
				openModal={
					permissionListNames?.includes('add_inventory_product')
						? handleAddInventoryProduct
						: undefined
				}
				isLoading={isLoading}
			/>
		</TooltipProvider>
	);
};

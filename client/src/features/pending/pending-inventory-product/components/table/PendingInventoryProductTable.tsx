import { InventoryProduct } from '@/features/inventory/types';
import { usePendingInventoryProduct } from '../../context/PendingInventoryProductContext';
import { DataTable } from '@/components/Tables/DataTable';
import { PendingInventoryProductCols } from './PendingInventoryProductCols';
import { useInventory } from '@/features/inventory/context';

interface PendingInventoryProductTableProps {
	openModal: (data: InventoryProduct, action: string) => void;
}

export const PendingInventoryProductTable = ({
	openModal,
}: PendingInventoryProductTableProps) => {
	const { data, isLoading, setSelectedInventoryProduct } =
		usePendingInventoryProduct();
	const { data: inventories } = useInventory();

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

	return (
		<>
			<DataTable
				columns={PendingInventoryProductCols({
					inventories,
					handleViewDetails,
					handleEditInventoryProduct,
					handleApproveInventoryProduct,
				})}
				data={data.sort((a, b) => b.inventory_id - a.inventory_id)}
				filterWhat={'product'}
				isLoading={isLoading}
				dataType="Inventory Product"
				// openModal={() => {}}
				// hideFilter
			/>
		</>
	);
};

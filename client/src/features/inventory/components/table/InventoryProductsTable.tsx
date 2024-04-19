import { DataTable } from '@/components/Tables/DataTable';
import { InventoryProductsCols } from './columns/InventoryProductsCols';
import { useInventoryProductByIdQuery } from '../../hooks/useInventoryProdsQuery';
import { InventoryProduct } from '../../types';
import { useInventoryProds } from '../../context/InventoryProdsContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useInventoryProductsByInventory } from '../../context';

interface InventoryProductsTableProps {
	// id: number;
	openModal: (data: any, action: string) => void;
}

export const InventoryProductsTable = ({
	// id,
	openModal,
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

	// const handleToggleStatus = (inventoryProductID: number, status: number) => {
	// 	handleSubmit({
	// 		action: 'update',
	// 		id: inventoryProductID,
	// 		data: { status: status, approved_stocks: 5 },
	// 	}).then(() => {
	// 		toast.success('Inventory product approved');
	// 	});
	// };

	const handleApproveInventoryProduct = (
		inventoryProduct: InventoryProduct,
	) => {
		setSelectedInventoryProduct(inventoryProduct);
		openModal(inventoryProduct, 'approve');
	};

	return (
		<TooltipProvider>
			<DataTable
				columns={InventoryProductsCols({
					handleViewDetails,
					handleEditInventoryProduct,
					handleApproveInventoryProduct,
				})}
				data={data ? data : []}
				filterWhat={'product'}
				dataType={'Items'}
				openModal={handleAddInventoryProduct}
				isLoading={isLoading}
			/>
		</TooltipProvider>
	);
};

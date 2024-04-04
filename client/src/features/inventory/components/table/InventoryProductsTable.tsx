import { DataTable } from '@/components/Tables/DataTable';
import { InventoryProductsCols } from './columns/InventoryProductsCols';
import { useInventoryProductByIdQuery } from '../../hooks/useInventoryProdsQuery';
import { InventoryProduct } from '../../types';
import { useInventoryProds } from '../../context/InventoryProdsContext';
import { useInventoryProdsMutation } from '../../hooks';

interface InventoryProductsTableProps {
	id: number;
	openModal: (data: any, action: string) => void;
}

export const InventoryProductsTable = ({
	id,
	openModal,
}: InventoryProductsTableProps) => {
	const { data, isLoading } = useInventoryProductByIdQuery(id);
	const { setSelectedInventoryProduct } = useInventoryProds();
	const { handleSubmit } = useInventoryProdsMutation();

	const handleAddInventoryProduct = () => {
		openModal({} as InventoryProduct, 'add');
	};

	const handleEditInventoryProduct = (inventoryProduct: InventoryProduct) => {
		setSelectedInventoryProduct(inventoryProduct);
		openModal(inventoryProduct, 'edit');
	};

	const handleToggleStatus = (inventoryProductID: number, status: number) => {
		handleSubmit({
			action: 'update',
			id: inventoryProductID,
			data: { status: status },
		});
	};

	return (
		<div className="w-full rounded-lg border bg-white">
			<DataTable
				columns={InventoryProductsCols({
					handleEditInventoryProduct,
					handleToggleStatus,
				})}
				data={data ? data : []}
				filterWhat={'product'}
				dataType={'Items'}
				openModal={handleAddInventoryProduct}
				isLoading={isLoading}
			/>
		</div>
	);
};

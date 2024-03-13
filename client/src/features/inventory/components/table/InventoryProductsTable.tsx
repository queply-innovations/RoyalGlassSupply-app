import { DataTable } from '@/components/Tables/DataTable';
import { InventoryProductsCols } from './columns/InventoryProductsCols';
import { useInventoryProductByIdQuery } from '../../hooks/useInventoryProdsQuery';
import { InventoryProduct } from '../../types';

interface InventoryProductsTableProps {
	id: number;
	openModal: (data: any, action: string) => void;
}

export const InventoryProductsTable = ({
	id,
	openModal,
}: InventoryProductsTableProps) => {
	const { data, isLoading } = useInventoryProductByIdQuery(id);

	const handleAddInventoryProduct = () => {
		openModal({} as InventoryProduct, 'add');
	};

	return (
		<div className="w-full rounded-lg border bg-white">
			<DataTable
				columns={InventoryProductsCols()}
				data={data ? data : []}
				filterWhat={'product'}
				dataType={'Item'}
				openModal={handleAddInventoryProduct}
				isLoading={isLoading}
			/>
		</div>
	);
};

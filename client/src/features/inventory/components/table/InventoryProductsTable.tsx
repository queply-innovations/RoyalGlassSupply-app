import { DataTable } from '@/components/Tables/DataTable';
import { InventoryProductsCols } from './columns/InventoryProductsCols';
import { useInventory } from '../../context/InventoryContext';
import { useInventoryProductByIdQuery } from '../../hooks/useInventoryProdsQuery';

export const InventoryProductsTable = () => {
	const { selectedInventory } = useInventory();
	const { data: items, isLoading } = useInventoryProductByIdQuery(
		selectedInventory.id,
	);

	return (
		<div className="w-full rounded-lg border bg-white">
			<DataTable
				columns={InventoryProductsCols()}
				data={items ? items : []}
				filterWhat={'product'}
				dataType={'Item'}
				openModal={() => {}}
				isLoading={isLoading}
			/>
		</div>
	);
};

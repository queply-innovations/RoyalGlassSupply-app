import { DataTable } from '@/components/Tables/DataTable';
import { InventoryProductsCols } from './columns/InventoryProductsCols';
import { useInventoryProductByIdQuery } from '../../hooks/useInventoryProdsQuery';
import { useEffect } from 'react';

interface InventoryProductsTableProps {
	id: number;
}

export const InventoryProductsTable = ({ id }: InventoryProductsTableProps) => {
	const { data, isLoading } = useInventoryProductByIdQuery(id);

	useEffect(() => console.log(data), [data]);

	return (
		<div className="w-full rounded-lg border bg-white">
			<DataTable
				columns={InventoryProductsCols()}
				data={data ? data : []}
				filterWhat={'product'}
				dataType={'Item'}
				openModal={() => {}}
				isLoading={isLoading}
			/>
		</div>
	);
};

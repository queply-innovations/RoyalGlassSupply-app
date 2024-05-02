import { DataTable } from '@/components/Tables/DataTable';
import { useReturnItems } from '../../context/ReturnItemsContext';
import { ReturnItemsCols } from './ReturnItemsCols';

export const ReturnItemsTable = () => {
	const { data, isFetching } = useReturnItems();

	return (
		<>
			<DataTable
				columns={ReturnItemsCols()}
				data={data ?? []}
				isLoading={isFetching}
				dataType="Return Items"
				filterWhat="product"
				// openModal={() => {}}
			/>
		</>
	);
};

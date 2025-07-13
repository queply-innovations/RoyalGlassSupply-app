import { DataTable } from '@/components/Tables/DataTable';
import { ReturnTableColumns } from './cols';
import { useReturnInvoice } from '../../context/ReturnInvoiceContext';
interface ReturnTableProps {}

export const ReturnTable = ({}: ReturnTableProps) => {
	const { selectedItems } = useReturnInvoice();
	const columns = ReturnTableColumns();

	return (
		<>
			{selectedItems.length > 0 && (
				<div>
					<DataTable
						columns={columns}
						data={selectedItems}
						filterWhat="id"
						hideFilter
						hidePagination={selectedItems.length < 10}
						dataType="returnItems"
					/>
				</div>
			)}
		</>
	);
};

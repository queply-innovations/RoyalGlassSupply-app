import { DataTable } from '@/components/Tables/DataTable';
import { useReturnInvoiceItemsPos } from '../../context/ReturnInvoiceItems';
import { ReturnTableColumns } from './cols';
import { useReturnInvoice } from '../../context/ReturnInvoiceContext';
interface ReturnTableProps {}

export const ReturnTable = ({}: ReturnTableProps) => {
	const { selectedItems, returnInvoice } = useReturnInvoice();
	//SelectedReturnItems

	return (
		<>
			{selectedItems.length > 0 && (
				<div>
					<DataTable
						columns={ReturnTableColumns()}
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

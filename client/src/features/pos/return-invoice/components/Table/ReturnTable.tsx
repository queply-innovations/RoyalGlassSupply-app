import { DataTable } from '@/components/Tables/DataTable';
import { useReturnInvoiceItemsPos } from '../../context/ReturnInvoiceItems';
import { ReturnTableColumns } from './cols';
interface ReturnTableProps {}

export const ReturnTable = ({}: ReturnTableProps) => {
  const { returnInvoiceItems, selectedReturnItems } =
    useReturnInvoiceItemsPos();
  //SelectedReturnItems

  return (
    <>
      {Object.keys(returnInvoiceItems).length > 0 && (
        <div>
          <DataTable
            columns={ReturnTableColumns}
            data={selectedReturnItems}
            filterWhat="id"
            hideFilter
            hidePagination={returnInvoiceItems.invoice_items.length < 10}
            dataType="returnItems"
          />
        </div>
      )}
    </>
  );
};

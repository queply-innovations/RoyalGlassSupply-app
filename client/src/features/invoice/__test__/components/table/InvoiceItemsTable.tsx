import { ColumnDef } from '@tanstack/react-table';
import { InvoiceItemDatabase, InvoiceItems } from '../../types';
import { PosTable } from '@/features/pos/__test__/components/Table/PosTable';
import { DataTable } from '@/components/Tables/DataTable';

interface InvoiceItemsTableProps {
   items: InvoiceItemDatabase[];
}

export const InvoiceItemsTable = ({ items }: InvoiceItemsTableProps) => {
   const colums: ColumnDef<InvoiceItemDatabase>[] = [
      {
         id: 'orderItem',
         enableResizing: false,
         header: () => {
            return <div className="flex ">Item #</div>;
         },
         cell: ({ row }) => {
            return (
               <div className="flex flex-row gap-2 ">
                  {row.original.product.brand ? (
                     <>
                        <span>({row.original.product.brand})</span>
                     </>
                  ) : null}
                  <span className="font-bold">{row.original.product.name}</span>
                  <span className="">{row.original.product.size}</span>
                  <span className="">{row.original.product.color}</span>
               </div>
            );
         },
         size: 200,
      },
      {
         id: 'quantity',
         enableResizing: false,
         header: () => {
            return <div className="flex ">Quantity</div>;
         },
         cell: ({ row }) => {
            return <div className="flex ">{row.original.quantity}</div>;
         },
      },
      {
         id: 'price',
         enableResizing: false,
         header: () => {
            return <div className="flex ">Price</div>;
         },
         cell: ({ row }) => {
            return <div className="flex ">{row.original.product_price}</div>;
         },
      },
   ];
   return (
      <>
         <DataTable
            columns={colums}
            data={items}
            dataType="orderItem"
            filterWhat="price"
            hideFilter
         />
      </>
   );
};

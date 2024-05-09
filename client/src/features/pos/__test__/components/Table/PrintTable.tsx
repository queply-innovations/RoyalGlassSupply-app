import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface PrintTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  invoice?: boolean;
  subtotal?: number;
  discount?: number;
  deliveryCharge?: number;
  totalDue?: number;
  amountPaid?: number;
}

export function PrintTable<TData, TValue>({
  columns,
  data,
  invoice,
  subtotal,
  discount,
  deliveryCharge,
  totalDue,
  amountPaid,
}: PrintTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: 200, //starting column size
      minSize: 50, //enforced during column resizing
      maxSize: 500, //enforced during column resizing
    },
  });
  return (
    <>
      <div className="border-gray-400">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className="border border-gray-400">
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width: `${header.getSize()}px`,
                      }}
                      className="text-black">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="[&_tr:last-child]:border-x">
            {table.getRowModel().rows?.length &&
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  className="border border-gray-400 text-black">
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="py-1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {invoice && subtotal && (
              <>
                <TableRow className="border-0 text-black">
                  <TableCell key={'none'} colSpan={2}></TableCell>
                  <TableCell
                    key={'subtotal-label'}
                    colSpan={1}
                    className="border-b border-l border-gray-400 py-1 text-xs font-medium">
                    <span className="flex w-full justify-end">Subtotal</span>
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    key={'subtotal-value'}
                    className="border-b border-r border-gray-400 py-1">
                    <span className="text-left text-xs">
                      {Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'PHP',
                      }).format(subtotal)}
                    </span>
                  </TableCell>
                </TableRow>
              </>
            )}

            {invoice && discount && (
              <>
                <TableRow className="border-0 text-black">
                  <TableCell key={'none'} colSpan={2}></TableCell>
                  <TableCell
                    colSpan={1}
                    key={'discount-label'}
                    className="border-b border-l border-gray-400 py-1 text-xs font-medium">
                    <span className="flex w-full justify-end">Discount</span>
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    key={'discount-value'}
                    className="border-b border-r border-gray-400 py-1">
                    <span className="text-left text-xs">
                      -{' '}
                      {Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'PHP',
                      }).format(discount)}
                    </span>
                  </TableCell>
                </TableRow>
              </>
            )}

            {invoice && deliveryCharge && (
              <>
                <TableRow className="border-0 text-black">
                  <TableCell key={'none'} colSpan={2}></TableCell>
                  <TableCell
                    colSpan={1}
                    key={'deliveryCharge-label'}
                    className="border-b border-l border-gray-400 py-1 text-xs font-medium">
                    <span className="flex w-full justify-end">
                      Delivery fee
                    </span>
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    key={'deliveryCharge-value'}
                    className="border-b border-r border-gray-400 py-1">
                    <span className="text-left text-xs">
                      {Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'PHP',
                      }).format(deliveryCharge)}
                    </span>
                  </TableCell>
                </TableRow>
              </>
            )}

            {invoice && totalDue && (
              <>
                <TableRow className="border-0 text-black">
                  <TableCell key={'none'} colSpan={2}></TableCell>
                  <TableCell
                    colSpan={1}
                    key={'totalDue-label'}
                    className="border-b border-l border-gray-400 py-1 text-xs font-bold">
                    <span className="flex w-full justify-end">Total due</span>
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    key={'totalDue-value'}
                    className="border-b border-r border-gray-400 py-1">
                    <span className="text-left text-xs font-bold">
                      {Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'PHP',
                      }).format(totalDue)}
                    </span>
                  </TableCell>
                </TableRow>
              </>
            )}

            {invoice && amountPaid && (
              <>
                <TableRow className="border-0 text-black">
                  <TableCell key={'none'} colSpan={2}></TableCell>
                  <TableCell
                    colSpan={1}
                    key="amountPaid-label"
                    className="border-b border-l border-gray-400 py-1 text-xs font-medium">
                    <span className="flex w-full justify-end">Amount paid</span>
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    key="amountPaid-value"
                    className="border-b border-r border-gray-400 py-1">
                    <span className="text-left text-xs">
                      {Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'PHP',
                      }).format(amountPaid)}
                    </span>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </div>

      {invoice && (
        <div className="mt-4 flex flex-col gap-2">
          <hr className="w-full border-gray-400" />
          <div className="mt-4 grid grid-cols-3 text-xs">
            <p>Issued by:</p>
            <p>Prepared by:</p>
            <p>Released/checked by:</p>
          </div>
        </div>
      )}
    </>
  );
}

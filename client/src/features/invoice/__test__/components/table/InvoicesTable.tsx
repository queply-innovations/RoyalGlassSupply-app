import { DataTable } from '@/components/Tables/DataTable';
import { useInvoice } from '../../context/InvoiceContext';
import { ColumnDef } from '@tanstack/react-table';
import { Invoices } from '../../types';
import {
   Button,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components';
import {
   ArrowDown,
   ArrowUp,
   ArrowUpDown,
   Ban,
   Check,
   Clock,
   List,
   MoreVertical,
   Pencil,
   ShoppingBasket,
} from 'lucide-react';
import { formatCurrency } from '@/utils/FormatCurrency';

import { useNavigate } from 'react-router-dom';

interface InvoicesTableProps {
   openModal: (data: any, action: string) => void;
}

export const InvoicesTable = ({ openModal }: InvoicesTableProps) => {
   const { invoices } = useInvoice();

   const navigate = useNavigate();

   const columns: ColumnDef<Invoices>[] = [
      {
         accessorKey: 'code',
         sortingFn: 'text',
         enableSorting: true,
         header: ({ column }) => {
            return (
               <>
                  <Button
                     onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                     }
                     className="flex flex-row items-center bg-transparent uppercase text-slate-700">
                     Code{' '}
                     {column.getIsSorted() === 'asc' ? (
                        <ArrowUp size={18} strokeWidth={2} />
                     ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown size={18} strokeWidth={2} />
                     ) : (
                        <ArrowUpDown size={18} strokeWidth={2} />
                     )}
                  </Button>
               </>
            );
         },
         cell: ({ row }) => {
            return (
               <div className="flex flex-row items-center gap-2">
                  <span className="font-bold">{row.original.code}</span>
               </div>
            );
         },
      },
      {
         accessorKey: 'warehouse.code',
         sortingFn: 'text',
         enableSorting: true,
         header: ({ column }) => {
            return (
               <div>
                  <Button
                     onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                     }
                     className="flex flex-row items-center bg-transparent uppercase text-slate-700">
                     Warehouse{' '}
                     {column.getIsSorted() === 'asc' ? (
                        <ArrowUp size={18} strokeWidth={2} />
                     ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown size={18} strokeWidth={2} />
                     ) : (
                        <ArrowUpDown size={18} strokeWidth={2} />
                     )}
                  </Button>
               </div>
            );
         },
      },
      {
         accessorKey: 'payment_method',
         sortingFn: 'text',
         enableSorting: true,
         header: ({ column }) => {
            return (
               <div>
                  <Button
                     onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                     }
                     className="flex flex-row items-center bg-transparent uppercase text-slate-700">
                     Type{' '}
                     {column.getIsSorted() === 'asc' ? (
                        <ArrowUp size={18} strokeWidth={2} />
                     ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown size={18} strokeWidth={2} />
                     ) : (
                        <ArrowUpDown size={18} strokeWidth={2} />
                     )}
                  </Button>
               </div>
            );
         },
         cell: ({ row }) => {
            const paymentMethod = row.original.payment_method
               .split('_')
               .join(' ');
            return (
               <>
                  <span className="capitalize">{paymentMethod}</span>
               </>
            );
         },
      },
      {
         accessorKey: 'is_paid',
         header: ({}) => {
            return <span>Balance Amount</span>;
         },
         cell: ({ row }) => {
            const status = row.original.is_paid;
            return (
               <>
                  <div className="group relative flex w-fit items-center justify-center">
                     {status === 1 ? (
                        <span>——</span>
                     ) : status === 0 ? (
                        <span className="">
                           {formatCurrency(row.original.balance_amount)}
                        </span>
                     ) : (
                        <Clock
                           size={20}
                           strokeWidth={2}
                           className="text-amber-500"
                        />
                     )}
                  </div>
               </>
            );
         },
      },
      {
         accessorKey: 'total_amount_due',
         header: ({ column }) => {
            return <span>Total Amount</span>;
         },
         cell: ({ row }) => {
            return formatCurrency(row.original.total_amount_due);
         },
      },
      {
         id: 'actions',
         cell: ({ row }) => {
            return (
               <div className="flex flex-row justify-center text-xs font-normal uppercase">
                  <DropdownMenu>
                     <DropdownMenuTrigger className="overflow-clip rounded-full bg-gray-100 p-1.5 hover:bg-gray-300">
                        <MoreVertical size={16} strokeWidth={2.25} />
                     </DropdownMenuTrigger>
                     <DropdownMenuContent className="relative z-50 w-44 bg-white">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-200" />

                        <DropdownMenuItem
                           onClick={() => {
                              //TODO view invoice items
                              navigate(`/transaction/items/${row.original.id}`);
                              // fetchInvoiceItemsById(row.original.id);
                              // setInvoiceSelected(row.original);
                              // setOpenDialog(true);
                              // console.log(row.original.id);
                           }}
                           className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200">
                           <span className="flex w-6 items-center justify-center">
                              <ShoppingBasket size={16} strokeWidth={2} />
                           </span>
                           <span>View Invoice Items</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                           onClick={() => {}}
                           className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200">
                           <span className="flex w-6 items-center justify-center">
                              <List size={16} strokeWidth={2.25} />
                           </span>
                           <span>Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                           onClick={() => {}}
                           className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200">
                           <span className="flex w-6 items-center justify-center">
                              <Pencil size={16} strokeWidth={2.25} />
                           </span>
                           <span>Edit</span>
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            );
         },
         enableGlobalFilter: false,
      },
   ];

   return (
      <>
         <DataTable
            columns={columns}
            data={invoices.sort((a, b) => {
               const dateA = new Date(a.updated_at ?? a.created_at);
               const dateB = new Date(b.updated_at ?? b.created_at);
               return dateB.getTime() - dateA.getTime();
            })}
            filterWhat={'code'}
            dataType={'Invoices'}
         />
      </>
   );
};

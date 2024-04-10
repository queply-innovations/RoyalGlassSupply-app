import { DataTable } from '@/components/Tables/DataTable';
import { useInvoice } from '../../context/InvoiceContext';
import { InvoicesCols } from './cols/InvoicesCols';
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
	Boxes,
	Check,
	Clock,
	List,
	MoreVertical,
	Pencil,
	ShoppingBasket,
} from 'lucide-react';
import { formatCurrency } from '@/utils/FormatCurrency';

interface InvoicesTableProps {
	openModal: (data: any, action: string) => void;
}

export const InvoicesTable = ({ openModal }: InvoicesTableProps) => {
	const { invoices } = useInvoice();
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
							className="flex flex-row items-center bg-transparent uppercase text-slate-700"
						>
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
							className="flex flex-row items-center bg-transparent uppercase text-slate-700"
						>
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
		},
		{
			accessorKey: 'type',
			sortingFn: 'text',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="flex flex-row items-center bg-transparent uppercase text-slate-700"
						>
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
		},
		{
			accessorKey: 'status',
			sortingFn: 'text',
			enableSorting: true,
			enableResizing: true,

			header: ({ column }) => {
				return (
					<div className="mx-auto flex">
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="flex flex-row items-center bg-transparent uppercase text-slate-700"
						>
							Discount Status{' '}
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
				const status = row.original.status;
				return (
					<>
						<div className="group relative flex w-fit items-center justify-center">
							{status === 'approved' ? (
								<Check
									size={20}
									strokeWidth={2}
									className="text-green-600"
								/>
							) : status === 'rejected' ? (
								<Ban
									size={20}
									strokeWidth={2}
									className="text-red-600"
								/>
							) : (
								<Clock
									size={20}
									strokeWidth={2}
									className="text-amber-500"
								/>
							)}
							<span className="absolute left-1/2 mx-auto -translate-x-1/2 -translate-y-7 rounded-md bg-gray-800 px-1 text-sm capitalize text-gray-100 opacity-0 transition-opacity group-hover:opacity-100">
								{status}
							</span>
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
									onClick={() => {}}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										<ShoppingBasket size={16} strokeWidth={2} />
									</span>
									<span>View Invoice Items</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => {}}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										<List size={16} strokeWidth={2.25} />
									</span>
									<span>Details</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => {}}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
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
			<div className="w-full rounded-lg border bg-white">
				<DataTable
					columns={columns}
					data={invoices}
					filterWhat={'code'}
					dataType={'Invoices'}
				/>
			</div>
		</>
	);
};

import { ColumnDef } from '@tanstack/react-table';
import { ProductPrices } from '../../../types';
import { Button } from '@/components';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

// TODO: Include notes column in the table - ideally, a tooltip or a popover

export const ProductPricesColumnsLimited: ColumnDef<ProductPrices>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<input
				type="checkbox"
				checked={table.getIsAllPageRowsSelected()}
				onChange={e => table.toggleAllPageRowsSelected(!!e.target.checked)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<input
				type="checkbox"
				checked={row.getIsSelected()}
				onChange={e => row.toggleSelected(!!e.target.checked)}
				aria-label="Select row"
				className="justify-center"
			/>
		),
	},
	{
		accessorKey: 'product.id',
		header: () => <div className="justify-center uppercase">Id</div>,
	},
	{
		id: 'name',
		accessorKey: 'product.name',
		header: ({ column }) => {
			return (
				<div className="justify-center">
					<Button
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === 'asc')
						}
						className="flex flex-row bg-transparent uppercase text-black"
					>
						Name {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
					</Button>
				</div>
			);
		},
	},
	{
		accessorKey: 'type',
		header: () => <div className="justify-center uppercase">Type</div>,
	},
	{
		accessorKey: 'unit',
		header: () => <div className="justify-center uppercase">Unit</div>,
	},
	{
		accessorKey: 'quantity',
		header: () => <div className="justify-center uppercase">Quantity</div>,
	},
	{
		accessorKey: 'retail_price',
		header: () => (
			<div className="justify-center uppercase">Retail Price</div>
		),
		cell: ({ row }) => {
			return (
				<div className="flex items-center">
					<span>
						{row.original.retail_price
							? `₱ ${row.original.retail_price.toFixed(2)})}`
							: `—`}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: 'approval_status',
		header: () => <div className="justify-center uppercase">Approval</div>,
		cell: ({ row }) => {
			const status = row.original.approval_status;
			return (
				<div className="flex items-center">
					<div
						className={`${
							status
								? status === 'approved'
									? 'bg-green-600'
									: status === 'rejected'
										? 'bg-red-600'
										: 'bg-amber-600'
								: ''
						}
          overflow-clip rounded-full px-2 py-1 text-xs font-bold uppercase text-white`}
					>
						{row.original.approval_status}
					</div>
				</div>
			);
		},
	},
];

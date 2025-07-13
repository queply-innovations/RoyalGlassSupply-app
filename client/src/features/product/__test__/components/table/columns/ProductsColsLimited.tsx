import { ColumnDef } from '@tanstack/react-table';
import { Product } from '../../../types';
import { Button } from '@/components';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

// TODO: Update notes column to include a popover to reveal notes instead of a simple cell value

export const ProductsColsLimited: ColumnDef<Product>[] = [
	// {
	// 	id: 'select',
	// 	header: ({ table }) => (
	// 		<input
	// 			type="checkbox"
	// 			checked={table.getIsAllPageRowsSelected()}
	// 			onChange={e => table.toggleAllPageRowsSelected(!!e.target.checked)}
	// 			aria-label="Select all"
	// 		/>
	// 	),
	// 	cell: ({ row }) => (
	// 		<input
	// 			type="checkbox"
	// 			checked={row.getIsSelected()}
	// 			onChange={e => row.toggleSelected(!!e.target.checked)}
	// 			aria-label="Select row"
	// 			className="justify-center"
	// 		/>
	// 	),
	// },
	// {
	// 	accessorKey: 'id',
	// 	header: () => <div className="justify-center uppercase">Id</div>,
	// },
	{
		accessorKey: 'serial_no',
		sortingFn: 'text',
		enableSorting: true,
		header: ({ column }) => {
			return (
				<div>
					<Button
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === 'asc')
						}
						className="ml-auto mr-auto flex flex-row items-center bg-transparent uppercase text-slate-700"
					>
						Serial Number{' '}
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
		id: 'name',
		accessorKey: 'name',
		sortingFn: 'text',
		enableSorting: true,
		header: ({ column }) => {
			return (
				<div>
					<Button
						onClick={() =>
							column.toggleSorting(column.getIsSorted() === 'asc')
						}
						className="ml-auto mr-auto flex flex-row items-center bg-transparent uppercase text-slate-700"
					>
						Name{' '}
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
		accessorKey: 'brand',
		header: () => <div className="justify-center uppercase">Brand</div>,
	},
	{
		accessorKey: 'size',
		header: () => <div className="justify-center uppercase">Size</div>,
	},
	{
		accessorKey: 'color',
		header: () => <div className="justify-center uppercase">Color</div>,
	},
	{
		accessorKey: 'notes',
		header: () => <div className="justify-center uppercase">Notes</div>,
	},
];

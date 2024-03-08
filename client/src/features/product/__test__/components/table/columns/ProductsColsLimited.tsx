import { ColumnDef } from '@tanstack/react-table';
import { Product } from '../../../types';
import { Button } from '@/components';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

// TODO: Update notes column to include a popover to reveal notes instead of a simple cell value

export const ProductsColsLimited: ColumnDef<Product>[] = [
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
		accessorKey: 'id',
		header: () => <div className="justify-center uppercase">Id</div>,
	},
	{
		id: 'name',
		accessorKey: 'name',
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
		accessorKey: 'serial_no',
		header: () => <div className="justify-center uppercase">Serial No.</div>,
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

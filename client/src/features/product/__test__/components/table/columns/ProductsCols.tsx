import { ColumnDef } from '@tanstack/react-table';
import { Product } from '../../../types';
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components';
import { ArrowDown, ArrowUp, ArrowUpDown, MoreVertical, Pencil, Trash2 } from 'lucide-react';

// TODO: Update notes column to include a popover to reveal notes instead of a simple cell value

interface ProductsColumnsProps {
	handleEditProduct: (product: Product) => void;
}

/**
 * Generates column definition for the Products table.
 *
 * @param handleEditProduct - Callback to edit product.
 * @returns Column definition for the Products table.
 */
export const ProductsCols = ({
	handleEditProduct,
}: ProductsColumnsProps): ColumnDef<Product>[] => {
	const columnDefinition: ColumnDef<Product>[] = [
		{
			id: 'select',
			header: ({ table }) => (
				<input
					type="checkbox"
					checked={table.getIsAllPageRowsSelected()}
					onChange={e =>
						table.toggleAllPageRowsSelected(!!e.target.checked)
					}
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
		// {
		// 	accessorKey: 'id',
		// 	sortingFn: 'text',
		// 	enableSorting: true,
		// 	header: ({ column }) => {
		// 		return (
		// 			<div>
		// 				<Button
		// 					onClick={() =>
		// 						column.toggleSorting(column.getIsSorted() === 'asc')
		// 					}
		// 					className="ml-auto mr-auto flex flex-row items-center bg-transparent uppercase text-slate-700"
		// 				>
		// 					Id{' '}
		// 					{column.getIsSorted() === 'asc' ? (
		// 						<ArrowUp size={18} strokeWidth={2} />
		// 					) : column.getIsSorted() === 'desc' ? (
		// 						<ArrowDown size={18} strokeWidth={2} />
		// 					) : (
		// 						<ArrowUpDown size={18} strokeWidth={2} />
		// 					)}
		// 				</Button>
		// 			</div>
		// 		);
		// 	},
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
		{
			id: 'actions',
			cell: ({ row }) => {
				const productRow = row.original;
				return (
					<div className="flex flex-row justify-end text-xs font-normal uppercase">
						<DropdownMenu>
							<DropdownMenuTrigger className="overflow-clip rounded-full bg-gray-100 p-1.5 hover:bg-gray-300">
								<MoreVertical size={16} strokeWidth={2.25} />
							</DropdownMenuTrigger>
							<DropdownMenuContent className="relative z-50 w-44 bg-white">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuSeparator className="bg-gray-200" />
								<DropdownMenuItem
									onClick={() => handleEditProduct(productRow)}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										<Pencil size={16} strokeWidth={2.25} />
									</span>
									<span className="font-medium">Edit</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			},
			enableGlobalFilter: false,
		},
	];
	return columnDefinition;
};

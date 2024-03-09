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
import { SortIcon } from '@/assets/icons';
import { MoreVertical, Pencil } from 'lucide-react';

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
							Name <SortIcon />
						</Button>
					</div>
				);
			},
		},
		{
			accessorKey: 'serial_no',
			header: () => (
				<div className="justify-center uppercase">Serial No.</div>
			),
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

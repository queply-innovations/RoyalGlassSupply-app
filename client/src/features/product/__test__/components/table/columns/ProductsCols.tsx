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
import {
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	MoreVertical,
	Pencil,
	Trash2,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface ProductsColumnsProps {
	handleEditProduct: (product: Product) => void;
	handleDeleteProduct: (product: Product) => void;
}

/**
 * Generates column definition for the Products table.
 *
 * @param handleEditProduct - Callback to edit product.
 * @returns Column definition for the Products table.
 */
export const ProductsCols = ({
	handleEditProduct,
	handleDeleteProduct,
}: ProductsColumnsProps): ColumnDef<Product>[] => {
	const { permissionListNames } = useAuth();
	const columnDefinition: ColumnDef<Product>[] = [
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
							className="flex flex-row items-center bg-transparent uppercase text-slate-700"
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
							className="flex flex-row items-center bg-transparent uppercase text-slate-700"
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
								{permissionListNames?.includes('update_product') && (
									<DropdownMenuItem
										onClick={() => handleEditProduct(productRow)}
										className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
									>
										<span className="flex w-6 items-center justify-center">
											<Pencil size={16} strokeWidth={2.25} />
										</span>
										<span className="font-medium">Edit</span>
									</DropdownMenuItem>
								)}

								{permissionListNames?.includes('delete_product') && (
									<DropdownMenuItem
										onClick={() => handleDeleteProduct(productRow)}
										className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700"
									>
										<span className="flex w-6 items-center justify-center">
											<Trash2 size={16} strokeWidth={2.25} />
										</span>
										<span className="font-medium">Delete</span>
									</DropdownMenuItem>
								)}
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

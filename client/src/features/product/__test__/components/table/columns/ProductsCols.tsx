import { ColumnDef } from '@tanstack/react-table';
import { Product } from '../../../types';
import { Button } from '@/components';
import { SortIcon } from '@/assets/icons';
import { FaPencilAlt } from 'react-icons/fa';

// TODO: Update notes column to include a popover to reveal notes instead of a simple cell value

interface ProductsColumnsProps {
	handleEditProduct: (product: Product) => void;
	handleRemoveProduct: (product: Product) => void;
}

/**
 * Generates column definition for the Products table.
 *
 * @param handleEditProduct - Callback to edit product.
 * @param handleRemoveProduct - Callback to remove product.
 * @returns Column definition for the Products table.
 */
export const ProductsCols = ({
	handleEditProduct,
	handleRemoveProduct,
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
					<div className="flex flex-row justify-center text-xs font-normal uppercase">
						<Button
							fill="empty"
							textColor={'black'}
							onClick={() => handleEditProduct(productRow)}
							className="flex flex-row items-center gap-2"
						>
							<FaPencilAlt /> Edit
						</Button>
						<Button
							fill={'red'}
							onClick={() => handleRemoveProduct(productRow)}
						>
							Remove
						</Button>
					</div>
				);
			},
			enableGlobalFilter: false,
		},
	];
	return columnDefinition;
};

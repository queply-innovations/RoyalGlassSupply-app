import { ColumnDef } from '@tanstack/react-table';
import { ProductPrices } from '../../../types';
import { Button } from '@/components';
import { SortIcon } from '@/assets/icons';
import { FaPencilAlt } from 'react-icons/fa';

interface ProductPricesColumnsProps {
	handleProdPriceDetails: (productPrice: ProductPrices) => void;
	handleEditProdPrice: (productPrice: ProductPrices) => void;
	handleRemoveProdPrice: (productPrice: ProductPrices) => void;
}

/**
 * Generates column definition for the ProductPrices table.
 *
 * @param handleProdPriceDetails - Callback to show product price details.
 * @param handleEditProdPrice - Callback to edit product price.
 * @param handleRemoveProdPrice - Callback to remove product price.
 * @returns Column definition for the ProductPrices table.
 */
export const ProductPricesColumns = ({
	handleProdPriceDetails,
	handleEditProdPrice,
	handleRemoveProdPrice,
}: ProductPricesColumnsProps): ColumnDef<ProductPrices>[] => {
	const columnDefinition: ColumnDef<ProductPrices>[] = [
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
							Name <SortIcon />
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
			accessorKey: 'capital_price',
			header: () => <div className="justify-center uppercase">Capital</div>,
			cell: ({ row }) => {
				return (
					<div className="flex items-center uppercase">
						<span>
							{row.original.capital_price
								? `₱${row.original.capital_price.toFixed(2)}`
								: `—`}
						</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'markup_price',
			header: () => <div className="justify-center uppercase">Markup</div>,
		},
		{
			accessorKey: 'retail_price',
			header: () => <div className="justify-center uppercase">Retail</div>,
			cell: ({ row }) => {
				return (
					<div className="flex items-center">
						<span>
							{row.original.retail_price
								? `₱${row.original.retail_price.toFixed(2)})}`
								: `—`}
						</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'on_sale',
			header: () => <div className="justify-center uppercase">On sale</div>,
			cell: ({ row }) => {
				return (
					<div className="flex items-center">
						<span>
							{row.original.on_sale
								? row.original.on_sale === 1
									? `YES`
									: `NO`
								: `NO`}
						</span>
					</div>
				);
			},
			enableGlobalFilter: false,
		},
		{
			accessorKey: 'sale_price',
			header: () => (
				<div className="justify-center uppercase">Sale price</div>
			),
			cell: ({ row }) => {
				return (
					<div className="flex items-center">
						<span>
							{row.original.sale_price
								? `₱${row.original.sale_price.toFixed(2)})}`
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
          overflow-clip rounded-full px-2 py-1 text-xs font-semibold uppercase text-white`}
						>
							{row.original.approval_status}
						</div>
					</div>
				);
			},
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
							onClick={() => handleProdPriceDetails(productRow)}
							className="flex flex-row items-center gap-2"
						>
							Info
						</Button>
						<Button
							fill="empty"
							textColor={'black'}
							onClick={() => handleEditProdPrice(productRow)}
							className="flex flex-row items-center gap-2"
						>
							<FaPencilAlt /> Edit
						</Button>
						<Button
							fill={'red'}
							onClick={() => handleRemoveProdPrice(productRow)}
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

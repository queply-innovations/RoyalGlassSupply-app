import { ColumnDef } from '@tanstack/react-table';
import { ProductPrices } from '../../../types';
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
import {
	Check,
	X,
	MoreVertical,
	Pencil,
	Trash2,
	Clock,
	List,
} from 'lucide-react';

interface ProductPricesColumnsProps {
	handleProdPriceDetails: (productPrice: ProductPrices) => void;
	handleEditProdPrice: (productPrice: ProductPrices) => void;
	handleToggleActiveStatus: (productPrice: ProductPrices) => void;
}

/**
 * Generates column definition for the ProductPrices table.
 *
 * @param handleProdPriceDetails - Callback to show product price details.
 * @param handleEditProdPrice - Callback to edit product price.
 * @param handleToggleActiveStatus - Callback to remove product price.
 * @returns Column definition for the ProductPrices table.
 */
export const ProductPricesColumns = ({
	handleProdPriceDetails,
	handleEditProdPrice,
	handleToggleActiveStatus,
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
				const onSale = row.original.on_sale;
				return (
					<div className="group relative flex w-fit items-center">
						{onSale === 1 ? (
							<Check
								size={20}
								strokeWidth={2.5}
								className="text-green-600"
							/>
						) : (
							<span>
								<X
									size={20}
									strokeWidth={2.5}
									className="text-gray-600"
								/>
							</span>
						)}
						<span className="text-nowrap absolute left-1/2 mx-auto -translate-x-1/2 -translate-y-7 rounded-md bg-gray-800 px-1 text-sm text-gray-100 opacity-0 transition-opacity group-hover:opacity-100">
							{onSale === 1 ? 'On sale' : 'Not on sale'}
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
			header: () => (
				<div className="mx-auto w-fit text-center uppercase">Approval</div>
			),
			cell: ({ row }) => {
				const status = row.original.approval_status;
				return (
					<>
						<div className="group relative mx-auto flex w-fit items-center justify-center">
							{status === 'approved' ? (
								<Check
									size={20}
									strokeWidth={2.5}
									className="text-green-600"
								/>
							) : status === 'rejected' ? (
								<X
									size={20}
									strokeWidth={2.5}
									className="text-red-600"
								/>
							) : (
								<Clock
									size={20}
									strokeWidth={2.5}
									className="text-yellow-600"
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
			accessorKey: 'on_sale',
			header: () => (
				<div className="mx-auto w-fit text-center uppercase">Active</div>
			),
			cell: ({ row }) => {
				const active = row.original.active_status;
				return (
					<div className="group relative mx-auto flex w-fit items-center justify-center">
						{active === 'active' ? (
							<Check
								size={20}
								strokeWidth={2.5}
								className="text-green-600"
							/>
						) : (
							<X size={20} strokeWidth={2.5} className="text-gray-600" />
						)}
						<span className="text-nowrap absolute left-1/2 mx-auto -translate-x-1/2 -translate-y-7 rounded-md bg-gray-800 px-1 text-sm text-gray-100 opacity-0 transition-opacity group-hover:opacity-100">
							{active === 'active' ? 'Active' : 'Inactive'}
						</span>
					</div>
				);
			},
			enableGlobalFilter: false,
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				const productRow = row.original;
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
									onClick={() => handleProdPriceDetails(productRow)}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										<List size={16} strokeWidth={2.25} />
									</span>
									<span>Details</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => handleEditProdPrice(productRow)}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										<Pencil size={16} strokeWidth={2.25} />
									</span>
									<span>Edit</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator className="bg-gray-200" />
								<DropdownMenuItem
									onClick={() => handleToggleActiveStatus(productRow)}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										{productRow.active_status ? (
											productRow.active_status === 'active' ? (
												<Check size={16} strokeWidth={2.25} />
											) : (
												<div></div>
											)
										) : (
											<div></div>
										)}
									</span>
									<span>Active</span>
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

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
	Ban,
	MoreVertical,
	Pencil,
	Box,
	Boxes,
	Clock,
	List,
	CircleOff,
	CheckCircle,
	ArrowUp,
	ArrowDown,
	ArrowUpDown,
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
			id: 'name',
			accessorKey: 'product.name',
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
							Product name{' '}
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
			header: () => <div className="justify-center uppercase">Type</div>,
			cell: ({ row }) => {
				const type = row.original.type;
				return (
					<div className="group relative flex w-fit items-center">
						{type === 'retail' ? (
							<Box size={20} strokeWidth={2} className="text-gray-700" />
						) : (
							<Boxes
								size={20}
								strokeWidth={1.75}
								className="text-gray-700"
							/>
						)}
						<span className="text-nowrap absolute left-1/2 mx-auto -translate-x-1/2 -translate-y-7 rounded-md bg-gray-800 px-1 text-sm capitalize text-gray-100 opacity-0 transition-opacity group-hover:opacity-100">
							{type}
						</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'stocks_quantity',
			header: () => <div className="justify-center uppercase">QTY</div>,
		},
		{
			accessorKey: 'stocks_unit',
			header: () => <div className="justify-center uppercase">Unit</div>,
		},
		{
			accessorKey: 'capital_price',
			header: () => <div className="justify-center uppercase">Capital</div>,
			cell: ({ row }) => {
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'PHP',
				}).format(row.original.capital_price);
				return (
					<div className="flex items-center uppercase">
						<span>{row.original.capital_price ? formatted : `—`}</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'markup_price',
			header: () => <div className="justify-center uppercase">Markup</div>,
			cell: ({ row }) => {
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'PHP',
				}).format(row.original.markup_price);
				return (
					<div className="flex items-center uppercase">
						<span>{row.original.markup_price ? formatted : `—`}</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'tax_amount',
			header: () => <div className="justify-center uppercase">Tax</div>,
			cell: ({ row }) => {
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'PHP',
				}).format(row.original.tax_amount);
				return (
					<div className="flex items-center uppercase">
						<span>{row.original.tax_amount ? formatted : `—`}</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'cost',
			header: () => <div className="justify-center uppercase">Cost</div>,
			cell: ({ row }) => {
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'PHP',
				}).format(row.original.cost);
				return (
					<div className="flex items-center uppercase">
						<span>{row.original.cost ? formatted : `—`}</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'on_sale',
			header: () => <div className="justify-center uppercase">Sale?</div>,
			cell: ({ row }) => {
				const onSale = row.original.on_sale;
				return (
					<div className="group relative flex w-fit items-center">
						{onSale === 1 ? (
							<Check
								size={20}
								strokeWidth={2}
								className="text-green-600"
							/>
						) : (
							<span>
								<X
									size={20}
									strokeWidth={2}
									className="text-gray-700"
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
			accessorKey: 'sale_discount',
			header: () => (
				<div className="justify-center uppercase">Disc. Price</div>
			),
			cell: ({ row }) => {
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'PHP',
				}).format(row.original.sale_discount);
				return (
					<div className="flex items-center uppercase">
						<span>{row.original.sale_discount ? formatted : `—`}</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'price',
			header: () => <div className="justify-center uppercase">Price</div>,
			cell: ({ row }) => {
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'PHP',
				}).format(row.original.price);
				return (
					<div className="flex items-center uppercase">
						<span>{row.original.price ? formatted : `—`}</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'warehouse.code',
			header: () => <div className="justify-center uppercase">WHS</div>,
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
			accessorKey: 'active_status',
			sortingFn: 'basic',
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
							Active{' '}
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
				const active = row.original.active_status;
				return (
					<div className="group relative mx-auto flex w-fit items-center justify-center">
						{active === 'active' ? (
							<Check
								size={20}
								strokeWidth={2}
								className="text-green-600"
							/>
						) : (
							<CircleOff
								size={20}
								strokeWidth={2}
								className="text-gray-600"
							/>
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
									{productRow.active_status ? (
										productRow.active_status === 'active' ? (
											<>
												<span className="flex w-6 items-center justify-center">
													<CircleOff
														size={16}
														strokeWidth={2.25}
													/>
												</span>
												<span>Set inactive</span>
											</>
										) : (
											<>
												<span className="flex w-6 items-center justify-center">
													<CheckCircle
														size={16}
														strokeWidth={2.25}
													/>
												</span>
												<span>Set active</span>
											</>
										)
									) : (
										<div></div>
									)}
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

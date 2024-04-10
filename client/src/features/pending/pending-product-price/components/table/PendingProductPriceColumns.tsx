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
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { ProductPrices } from '@/features/product/__test__/types';
import { ColumnDef } from '@tanstack/react-table';
import currency from 'currency.js';
import {
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	Check,
	CircleOff,
	List,
	MoreVertical,
	Pencil,
	X,
	CheckCircle,
	Ban,
} from 'lucide-react';

interface PendingProductPriceColumnsProps {
	handleProdPriceDetails: (productPrice: ProductPrices) => void;
	handleEditProdPrice: (productPrice: ProductPrices) => void;
	handleApproveProdPrice: (id: number) => void;
	handleRejectProdPrice: (id: number) => void;
}

export const PendingProductPriceColumns = ({
	handleProdPriceDetails,
	handleEditProdPrice,
	handleApproveProdPrice,
	handleRejectProdPrice,
}: PendingProductPriceColumnsProps) => {
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
			accessorKey: 'warehouse.code',
			sortingFn: 'basic',
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
							WHS{' '}
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
			accessorKey: 'unit',
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
				}).format(row.original.markup_price || 0);
				const markupPercent = currency(
					(row.original.markup_price / row.original.capital_price) * 100,
					{ precision: 3 },
				).value;
				return (
					<div className="flex items-center uppercase">
						<span>{formatted}</span>
						<span className="text-gray-500">
							&nbsp;({markupPercent}%)
						</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'sale_discount',
			header: () => <div className="justify-center uppercase">Discount</div>,
			cell: ({ row }) => {
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'PHP',
				}).format(row.original.sale_discount || 0);
				return (
					<div className="flex items-center">
						<span>
							{!!row.original.on_sale ? (
								formatted
							) : (
								<div className="group relative flex w-fit items-center">
									<Tooltip>
										<TooltipTrigger>
											<X
												size={20}
												strokeWidth={2}
												className="text-gray-700"
											/>
										</TooltipTrigger>
										<TooltipContent>
											<p className="text-sm font-medium normal-case">
												Not on sale
											</p>
										</TooltipContent>
									</Tooltip>
								</div>
							)}
						</span>
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
						<Tooltip>
							<TooltipTrigger>
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
							</TooltipTrigger>
							<TooltipContent>
								<p className="text-sm font-medium capitalize">
									{active}
								</p>
							</TooltipContent>
						</Tooltip>
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
									onClick={() => {
										handleApproveProdPrice(productRow.id);
									}}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										<CheckCircle size={16} strokeWidth={2.25} />
									</span>
									<span>Approve</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => {
										handleRejectProdPrice(productRow.id);
									}}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										<Ban size={16} strokeWidth={2.25} />
									</span>
									<span>Reject</span>
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

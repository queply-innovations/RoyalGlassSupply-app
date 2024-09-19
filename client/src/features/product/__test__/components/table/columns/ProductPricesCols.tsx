import { ColumnDef } from '@tanstack/react-table';
import { ProductPrices } from '../../../types';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components';
import {
	X,
	MoreVertical,
	Pencil,
	List,
	Trash2,
	// ArrowDownWideNarrow,
	// ArrowUpNarrowWide,
	ArrowUp,
	ArrowDown,
	ArrowUpDown,
} from 'lucide-react';
import currency from 'currency.js';
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@/components/ui/tooltip';
import { useAuth } from '@/context/AuthContext';
// import { useProductPricesPaginated } from '../../../context/ProductPricesPaginatedContext';
import { Button } from '@/components/ui/button';

interface ProductPricesColumnsProps {
	// handleProdPriceDetails: (productPrice: ProductPricesPOS) => void;
	// handleEditProdPrice: (productPrice: ProductPricesPOS) => void;
	// handleDeleteProdPrice: (productPrice: ProductPricesPOS) => void;
	handleProdPriceDetails: (productPrice: ProductPrices) => void;
	handleEditProdPrice: (productPrice: ProductPrices) => void;
	handleDeleteProdPrice: (productPrice: ProductPrices) => void;
}

/**
 * Generates column definition for the ProductPrices table.
 *
 * @param handleProdPriceDetails - Callback to show product price details.
 * @param handleEditProdPrice - Callback to edit product price.
 * @returns Column definition for the ProductPrices table.
 */
export const ProductPricesColumns = ({
	handleProdPriceDetails,
	handleEditProdPrice,
	handleDeleteProdPrice,
	// }: ProductPricesColumnsProps): ColumnDef<ProductPricesPOS>[] => {
}: ProductPricesColumnsProps): ColumnDef<ProductPrices>[] => {
	const { permissionListNames } = useAuth();
	// const { sorting, setSorting } = useProductPricesPaginated();

	// const columnDefinition: ColumnDef<ProductPricesPOS>[] = [
	// 	{
	// 		id: 'name',
	// 		accessorKey: 'product.name',
	// 		header: () => {
	// 			return <div className="justify-center uppercase">Name</div>;
	// 		},
	// 	},
	// 	{
	// 		accessorKey: 'product.brand',
	// 		header: () => <div className="justify-center uppercase">Brand</div>,
	// 	},
	// 	{
	// 		accessorKey: 'product.size',
	// 		header: () => <div className="justify-center uppercase">Size</div>,
	// 	},
	// 	{
	// 		accessorKey: 'product.color',
	// 		header: () => <div className="justify-center uppercase">Color</div>,
	// 	},
	// 	{
	// 		accessorKey: 'inventory_product.inventory.code',
	// 		enableSorting: true,
	// 		header: () => (
	// 			<div className="justify-center uppercase">Inventory</div>
	// 		),
	// 	},
	// 	{
	// 		accessorKey: 'capital_price',
	// 		header: ({ column }) => (
	// 			<Button
	// 				variant={'ghost'}
	// 				onClick={() => {
	// 					if (column.getNextSortingOrder()) {
	// 						setSorting([
	// 							{
	// 								id: 'capital_price',
	// 								desc: column.getNextSortingOrder() === 'desc',
	// 							},
	// 						]);
	// 					} else {
	// 						setSorting([{ id: 'created_at', desc: true }]);
	// 					}
	// 				}}
	// 				className={`flex flex-row items-center gap-1 bg-transparent px-0 text-xs uppercase ${sorting[0]?.id === 'capital_price' && 'font-bold'}`}
	// 			>
	// 				Capital{' '}
	// 				{sorting[0]?.id === 'capital_price' && sorting[0].desc ? (
	// 					<ArrowDownWideNarrow size={16} strokeWidth={2} />
	// 				) : sorting[0]?.id === 'capital_price' && !sorting[0]?.desc ? (
	// 					<ArrowUpNarrowWide size={16} strokeWidth={2} />
	// 				) : null}
	// 			</Button>
	// 		),
	// 		cell: ({ row }) => {
	// 			const formatted = new Intl.NumberFormat('en-US', {
	// 				style: 'currency',
	// 				currency: 'PHP',
	// 			}).format(row.original.capital_price);
	// 			return (
	// 				<div className="flex items-center uppercase">
	// 					<span>{row.original.capital_price ? formatted : `—`}</span>
	// 				</div>
	// 			);
	// 		},
	// 	},
	// 	{
	// 		accessorKey: 'markup_price',
	// 		header: ({ column }) => (
	// 			<Button
	// 				variant={'ghost'}
	// 				onClick={() => {
	// 					if (column.getNextSortingOrder()) {
	// 						setSorting([
	// 							{
	// 								id: 'markup_price',
	// 								desc: column.getNextSortingOrder() === 'desc',
	// 							},
	// 						]);
	// 					} else {
	// 						setSorting([{ id: 'created_at', desc: true }]);
	// 					}
	// 				}}
	// 				className={`flex flex-row items-center gap-1 bg-transparent px-0 text-xs uppercase ${sorting[0]?.id === 'markup_price' && 'font-bold'}`}
	// 			>
	// 				Markup{' '}
	// 				{sorting[0]?.id === 'markup_price' && sorting[0].desc ? (
	// 					<ArrowDownWideNarrow size={16} strokeWidth={2} />
	// 				) : sorting[0]?.id === 'markup_price' && !sorting[0]?.desc ? (
	// 					<ArrowUpNarrowWide size={16} strokeWidth={2} />
	// 				) : null}
	// 			</Button>
	// 		),
	// 		cell: ({ row }) => {
	// 			const formatted = new Intl.NumberFormat('en-US', {
	// 				style: 'currency',
	// 				currency: 'PHP',
	// 			}).format(row.original.markup_price || 0);
	// 			const markupPercent = currency(
	// 				(row.original.markup_price / row.original.capital_price) * 100,
	// 				{ precision: 3 },
	// 			).value;
	// 			return (
	// 				<div className="flex items-center uppercase">
	// 					<span>{formatted}</span>
	// 					<span className="text-gray-500">
	// 						&nbsp;({markupPercent}%)
	// 					</span>
	// 				</div>
	// 			);
	// 		},
	// 	},
	// 	{
	// 		accessorKey: 'sale_discount',
	// 		header: ({ column }) => (
	// 			<Button
	// 				variant={'ghost'}
	// 				onClick={() => {
	// 					if (column.getNextSortingOrder()) {
	// 						setSorting([
	// 							{
	// 								id: 'sale_discount',
	// 								desc: column.getNextSortingOrder() === 'desc',
	// 							},
	// 						]);
	// 					} else {
	// 						setSorting([{ id: 'created_at', desc: true }]);
	// 					}
	// 				}}
	// 				className={`flex flex-row items-center gap-1 bg-transparent px-0 text-xs uppercase ${sorting[0]?.id === 'sale_discount' && 'font-bold'}`}
	// 			>
	// 				Discount{' '}
	// 				{sorting[0]?.id === 'sale_discount' && sorting[0].desc ? (
	// 					<ArrowDownWideNarrow size={16} strokeWidth={2} />
	// 				) : sorting[0]?.id === 'sale_discount' && !sorting[0]?.desc ? (
	// 					<ArrowUpNarrowWide size={16} strokeWidth={2} />
	// 				) : null}
	// 			</Button>
	// 		),
	// 		cell: ({ row }) => {
	// 			const formatted = new Intl.NumberFormat('en-US', {
	// 				style: 'currency',
	// 				currency: 'PHP',
	// 			}).format(row.original.sale_discount || 0);
	// 			return (
	// 				<div className="flex items-center">
	// 					<span>
	// 						{row.original.on_sale ? (
	// 							formatted
	// 						) : (
	// 							<div className="group relative flex w-fit items-center">
	// 								<Tooltip>
	// 									<TooltipTrigger>
	// 										<X
	// 											size={20}
	// 											strokeWidth={2}
	// 											className="text-gray-700"
	// 										/>
	// 									</TooltipTrigger>
	// 									<TooltipContent>
	// 										<p className="text-sm font-medium normal-case">
	// 											Not on sale
	// 										</p>
	// 									</TooltipContent>
	// 								</Tooltip>
	// 							</div>
	// 						)}
	// 					</span>
	// 				</div>
	// 			);
	// 		},
	// 	},
	// 	{
	// 		accessorKey: 'price',
	// 		header: ({ column }) => (
	// 			<Button
	// 				variant={'ghost'}
	// 				onClick={() => {
	// 					if (column.getNextSortingOrder()) {
	// 						setSorting([
	// 							{
	// 								id: 'price',
	// 								desc: column.getNextSortingOrder() === 'desc',
	// 							},
	// 						]);
	// 					} else {
	// 						setSorting([{ id: 'created_at', desc: true }]);
	// 					}
	// 				}}
	// 				className={`flex flex-row items-center gap-1 bg-transparent px-0 text-xs uppercase ${sorting[0]?.id === 'price' && 'font-bold'}`}
	// 			>
	// 				Price{' '}
	// 				{sorting[0]?.id === 'price' && sorting[0].desc ? (
	// 					<ArrowDownWideNarrow size={16} strokeWidth={2} />
	// 				) : sorting[0]?.id === 'price' && !sorting[0]?.desc ? (
	// 					<ArrowUpNarrowWide size={16} strokeWidth={2} />
	// 				) : null}
	// 			</Button>
	// 		),
	// 		cell: ({ row }) => {
	// 			const formatted = new Intl.NumberFormat('en-US', {
	// 				style: 'currency',
	// 				currency: 'PHP',
	// 			}).format(row.original.price);
	// 			return (
	// 				<div className="flex items-center uppercase">
	// 					<span>{row.original.price ? formatted : `—`}</span>
	// 				</div>
	// 			);
	// 		},
	// 	},
	// 	{
	// 		accessorKey: 'inventory_product.remaining_stocks_count',
	// 		header: () => (
	// 			<div className="justify-center uppercase">Remaining</div>
	// 		),
	// 		cell: ({ row }) => {
	// 			const remainingStocks =
	// 				row.original.inventory_product.stocks_count -
	// 				(row.original.inventory_product.purchased_stocks ?? 0);
	// 			const stocksCountLow =
	// 				row.original.inventory_product.stocks_count * 0.2;
	// 			const stocksCountHalf =
	// 				row.original.inventory_product.stocks_count * 0.5;

	// 			return (
	// 				<Tooltip>
	// 					<TooltipTrigger>
	// 						<span
	// 							className={`${stocksCountLow >= remainingStocks ? 'font-bold text-red-700' : stocksCountHalf >= remainingStocks ? 'font-semibold text-amber-700' : ''}`}
	// 						>
	// 							{remainingStocks > 0 ? remainingStocks : 0}
	// 						</span>
	// 					</TooltipTrigger>
	// 					<TooltipContent>
	// 						{stocksCountLow >= remainingStocks
	// 							? 'Remaining stocks are low!'
	// 							: stocksCountHalf >= remainingStocks
	// 								? 'Remaining stocks are below 50%'
	// 								: 'Remaining stocks are above 50%'}
	// 					</TooltipContent>
	// 				</Tooltip>
	// 			);
	// 		},
	// 	},
	// 	{
	// 		id: 'actions',
	// 		cell: ({ row }) => {
	// 			const productRow = row.original;
	// 			return (
	// 				<div className="flex flex-row justify-center text-xs font-normal uppercase">
	// 					<DropdownMenu>
	// 						<DropdownMenuTrigger className="overflow-clip rounded-full bg-gray-100 p-1.5 hover:bg-gray-300">
	// 							<MoreVertical size={16} strokeWidth={2.25} />
	// 						</DropdownMenuTrigger>
	// 						<DropdownMenuContent className="relative z-50 w-44 bg-white">
	// 							<DropdownMenuLabel>Actions</DropdownMenuLabel>
	// 							<DropdownMenuSeparator className="bg-gray-200" />
	// 							<DropdownMenuItem
	// 								onClick={() => handleProdPriceDetails(productRow)}
	// 								className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
	// 							>
	// 								<span className="flex w-6 items-center justify-center">
	// 									<List size={16} strokeWidth={2.25} />
	// 								</span>
	// 								<span>Details</span>
	// 							</DropdownMenuItem>

	// 							{permissionListNames?.includes(
	// 								'edit_product_price',
	// 							) && (
	// 								<DropdownMenuItem
	// 									onClick={() => handleEditProdPrice(productRow)}
	// 									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
	// 								>
	// 									<span className="flex w-6 items-center justify-center">
	// 										<Pencil size={16} strokeWidth={2.25} />
	// 									</span>
	// 									<span>Edit</span>
	// 								</DropdownMenuItem>
	// 							)}

	// 							{permissionListNames?.includes(
	// 								'delete_product_price',
	// 							) && (
	// 								<>
	// 									<DropdownMenuSeparator className="bg-gray-200" />
	// 									<DropdownMenuItem
	// 										onClick={() =>
	// 											handleDeleteProdPrice(productRow)
	// 										}
	// 										className="flex flex-row items-center gap-3 rounded-md p-2 focus:bg-red-100 focus:text-red-700"
	// 									>
	// 										<span className="flex w-6 items-center justify-center">
	// 											<Trash2 size={16} strokeWidth={2.25} />
	// 										</span>
	// 										<span>Delete</span>
	// 									</DropdownMenuItem>
	// 								</>
	// 							)}
	// 						</DropdownMenuContent>
	// 					</DropdownMenu>
	// 				</div>
	// 			);
	// 		},
	// 		enableGlobalFilter: false,
	// 	},
	// ];

	const columnDefinition: ColumnDef<ProductPrices>[] = [
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
			accessorKey: 'product.brand',
			header: () => <div className="justify-center uppercase">Brand</div>,
		},
		{
			accessorKey: 'product.size',
			header: () => <div className="justify-center uppercase">Size</div>,
		},
		{
			accessorKey: 'product.color',
			header: () => <div className="justify-center uppercase">Color</div>,
		},
		{
			accessorKey: 'inventory_product.inventory.code',
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
							Inventory{' '}
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
			accessorKey: 'inventory_product.remaining_stocks_count',
			header: () => (
				<div className="justify-center uppercase">Remaining</div>
			),
			cell: ({ row }) => {
				const remainingStocks =
					row.original.inventory_product.remaining_stocks_count ?? 0;
				const stocksCountLow =
					row.original.inventory_product.stocks_count * 0.2;
				const stocksCountHalf =
					row.original.inventory_product.stocks_count * 0.5;
				return (
					<Tooltip>
						<TooltipTrigger>
							<span
								className={`${stocksCountLow >= remainingStocks ? 'font-bold text-red-700' : stocksCountHalf >= remainingStocks ? 'font-semibold text-amber-700' : ''}`}
							>
								{remainingStocks}
							</span>
						</TooltipTrigger>
						<TooltipContent>
							{stocksCountLow >= remainingStocks
								? 'Remaining stocks are low!'
								: stocksCountHalf >= remainingStocks
									? 'Remaining stocks are below 50%'
									: 'Remaining stocks are above 50%'}
						</TooltipContent>
					</Tooltip>
				);
			},
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

								{permissionListNames?.includes(
									'edit_product_price',
								) && (
									<DropdownMenuItem
										onClick={() => handleEditProdPrice(productRow)}
										className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
									>
										<span className="flex w-6 items-center justify-center">
											<Pencil size={16} strokeWidth={2.25} />
										</span>
										<span>Edit</span>
									</DropdownMenuItem>
								)}

								{permissionListNames?.includes(
									'delete_product_price',
								) && (
									<>
										<DropdownMenuSeparator className="bg-gray-200" />
										<DropdownMenuItem
											onClick={() =>
												handleDeleteProdPrice(productRow)
											}
											className="flex flex-row items-center gap-3 rounded-md p-2 focus:bg-red-100 focus:text-red-700"
										>
											<span className="flex w-6 items-center justify-center">
												<Trash2 size={16} strokeWidth={2.25} />
											</span>
											<span>Delete</span>
										</DropdownMenuItem>
									</>
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

import { ColumnDef } from '@tanstack/react-table';
import { InventoryProduct } from '../../../types';
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
	CheckCircle,
	Clock,
	List,
	MoreVertical,
	Pencil,
	Trash2,
} from 'lucide-react';
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@/components/ui/tooltip';
import { useAuth } from '@/context/AuthContext';

interface InventoryProductsColsProps {
	handleViewDetails: (inventoryProduct: InventoryProduct) => void;
	handleEditInventoryProduct: (inventoryProduct: InventoryProduct) => void;
	handleApproveInventoryProduct: (inventoryProduct: InventoryProduct) => void;
	handleDeleteInventoryProduct: (inventoryProduct: InventoryProduct) => void;
}

export const InventoryProductsCols = ({
	handleViewDetails,
	handleEditInventoryProduct,
	handleApproveInventoryProduct,
	handleDeleteInventoryProduct,
}: InventoryProductsColsProps) => {
	const { permissionListNames } = useAuth();

	const columnDefinition: ColumnDef<InventoryProduct>[] = [
		{
			id: 'product_name',
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
							className="flex flex-row items-center whitespace-nowrap bg-transparent uppercase text-slate-700"
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
			accessorKey: 'capital_price',
			header: () => (
				<div className="justify-center whitespace-nowrap uppercase">
					Cap. Price
				</div>
			),
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
			accessorKey: 'stocks_count',
			header: () => (
				<div className="justify-center whitespace-nowrap uppercase">
					Stocks
				</div>
			),
		},
		{
			accessorKey: 'approved_stocks',
			header: () => (
				<div className="justify-center whitespace-nowrap uppercase">
					Approved
				</div>
			),
		},
		{
			accessorKey: 'sold_count',
			header: () => <div className="justify-center uppercase">Sold</div>,
		},
		{
			accessorKey: 'remaining_stocks_count',
			header: () => (
				<div className="justify-center uppercase">Remaining</div>
			),
			cell: ({ row }) => {
				const remainingStocks = row.original.remaining_stocks_count ?? 0;
				const stocksCountLow = row.original.stocks_count * 0.2;
				const stocksCountHalf = row.original.stocks_count * 0.5;
				return (
					<Tooltip>
						<TooltipTrigger>
							<span
								className={`${stocksCountLow >= remainingStocks ? 'font-extrabold text-red-600 drop-shadow' : stocksCountHalf >= remainingStocks ? 'font-extrabold text-amber-600 drop-shadow' : ''}`}
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
			accessorKey: 'status',
			header: () => <div className="justify-center uppercase">Status</div>,
			cell: ({ row }) => (
				<Tooltip>
					<div className="group relative flex w-fit items-center">
						<TooltipTrigger>
							{row.original.approved_stocks > 0 ? (
								<CheckCircle
									size={20}
									strokeWidth={2}
									className="text-green-600"
								/>
							) : (
								<Clock
									size={20}
									strokeWidth={2}
									className="text-gray-600"
								/>
							)}
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-sm font-medium normal-case">
								{row.original.approved_stocks > 0
									? 'Approved'
									: 'Pending'}
							</p>
						</TooltipContent>
					</div>
				</Tooltip>
			),
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				const inventoryItemRow = row.original;
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
									onClick={() => {
										handleViewDetails(inventoryItemRow);
									}}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										<List size={16} strokeWidth={2.25} />
									</span>
									<span>Details</span>
								</DropdownMenuItem>

								{permissionListNames?.includes(
									'edit_inventory_items',
								) && (
									<DropdownMenuItem
										onClick={() => {
											handleEditInventoryProduct(inventoryItemRow);
										}}
										className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
									>
										<span className="flex w-6 items-center justify-center">
											<Pencil size={16} strokeWidth={2.25} />
										</span>
										<span>Edit</span>
									</DropdownMenuItem>
								)}

								{permissionListNames?.includes(
									'approve_inventory_items',
								) && (
									<DropdownMenuItem
										onClick={() =>
											handleApproveInventoryProduct(inventoryItemRow)
										}
										className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
									>
										<span className="flex w-6 items-center justify-center">
											<CheckCircle size={16} strokeWidth={2.25} />
										</span>
										<span>Approve stocks</span>
									</DropdownMenuItem>
								)}

								{permissionListNames?.includes(
									'delete_inventory_items',
								) && (
									<>
										<DropdownMenuSeparator className="bg-gray-200" />
										<DropdownMenuItem
											onClick={() =>
												handleDeleteInventoryProduct(
													inventoryItemRow,
												)
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

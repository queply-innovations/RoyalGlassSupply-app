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
} from 'lucide-react';
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@/components/ui/tooltip';

interface InventoryProductsColsProps {
	handleViewDetails: (inventoryProduct: InventoryProduct) => void;
	handleEditInventoryProduct: (inventoryProduct: InventoryProduct) => void;
	handleToggleStatus: (inventoryProductID: number, status: number) => void;
}

export const InventoryProductsCols = ({
	handleViewDetails,
	handleEditInventoryProduct,
	handleToggleStatus,
}: InventoryProductsColsProps) => {
	const columnDefinition: ColumnDef<InventoryProduct>[] = [
		// {
		// 	id: 'select',
		// 	header: ({ table }) => (
		// 		<input
		// 			type="checkbox"
		// 			checked={table.getIsAllPageRowsSelected()}
		// 			onChange={e =>
		// 				table.toggleAllPageRowsSelected(!!e.target.checked)
		// 			}
		// 			aria-label="Select all"
		// 		/>
		// 	),
		// 	cell: ({ row }) => (
		// 		<input
		// 			type="checkbox"
		// 			checked={row.getIsSelected()}
		// 			onChange={e => row.toggleSelected(!!e.target.checked)}
		// 			aria-label="Select row"
		// 			className="justify-center"
		// 		/>
		// 	),
		// },
		{
			id: 'product',
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
		// {
		// 	accessorKey: 'supplier_id.name',
		// 	header: () => <div className="justify-center uppercase">Supplier</div>,
		// },
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
		// {
		// 	accessorKey: 'unit',
		// 	header: () => <div className="justify-center uppercase">Unit</div>,
		// },
		// {
		// 	accessorKey: 'stocks_count',
		// 	header: () => (
		// 		<div className="justify-center whitespace-nowrap uppercase">
		// 			Stocks
		// 		</div>
		// 	),
		// },
		// {
		// 	accessorKey: 'damage_count',
		// 	header: () => (
		// 		<div className="justify-center whitespace-nowrap uppercase">
		// 			Damaged
		// 		</div>
		// 	),
		// },
		{
			accessorKey: 'total_count',
			header: () => (
				<div className="justify-center whitespace-nowrap uppercase">
					Total
				</div>
			),
		},
		// {
		// 	accessorKey: 'transferred_stocks_count',
		// 	header: () => (
		// 		<div className="justify-center uppercase">Transferred</div>
		// 	),
		// },
		{
			accessorKey: 'sold_count',
			header: () => <div className="justify-center uppercase">Sold</div>,
		},
		// {
		// 	accessorKey: 'miscellaneous_count',
		// 	header: () => <div className="justify-center uppercase">Misc</div>,
		// },
		{
			accessorKey: 'remaining_stocks_count',
			header: () => (
				<div className="justify-center uppercase">Remaining</div>
			),
		},
		{
			accessorKey: 'status',
			header: () => <div className="justify-center uppercase">Status</div>,
			cell: ({ row }) => (
				<Tooltip>
					<div className="group relative flex w-fit items-center">
						<TooltipTrigger>
							{!!row.original.status ? (
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
								{!!row.original.status ? 'Approved' : 'Pending'}
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
								<DropdownMenuItem
									onClick={() =>
										handleToggleStatus(
											inventoryItemRow.id,
											+!inventoryItemRow.status,
											// converts current status to 0 or 1
										)
									}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										{!!inventoryItemRow.status ? (
											<Clock size={16} strokeWidth={2.25} />
										) : (
											<CheckCircle size={16} strokeWidth={2.25} />
										)}
									</span>
									<span>
										{!!inventoryItemRow.status
											? 'Set pending'
											: 'Set approved'}
									</span>
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

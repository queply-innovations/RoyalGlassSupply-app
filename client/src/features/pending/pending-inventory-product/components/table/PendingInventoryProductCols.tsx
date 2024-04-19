import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components';
import { InventoryProduct, Inventory } from '@/features/inventory/types';
import { ColumnDef } from '@tanstack/react-table';
import {
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	List,
	MoreVertical,
} from 'lucide-react';

interface PendingInventoryProductColsProps {
	inventories: Inventory[];
	handleViewDetails: (inventoryProduct: InventoryProduct) => void;
}

export const PendingInventoryProductCols = ({
	inventories,
	handleViewDetails,
}: PendingInventoryProductColsProps) => {
	const columnDefinition: ColumnDef<InventoryProduct>[] = [
		{
			accessorKey: 'inventory_id',
			header: () => (
				<div className="justify-center uppercase">Inventory</div>
			),
			cell: ({ row }) => (
				<div>
					{inventories
						? inventories.find(
								item => item.id === row.original.inventory_id,
							)?.code
						: row.original.inventory_id}
				</div>
			),
		},
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
			accessorKey: 'total_count',
			header: () => (
				<div className="justify-center whitespace-nowrap uppercase">
					Total
				</div>
			),
		},
		{
			accessorKey: 'sold_count',
			header: () => (
				<div className="justify-center whitespace-nowrap uppercase">
					Sold
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
			cell: ({ row }) => (
				<div>
					<span>{row.original.approved_stocks ?? 0}</span>
				</div>
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

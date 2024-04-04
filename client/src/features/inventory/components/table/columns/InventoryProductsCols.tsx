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
	MoreVertical,
	Pencil,
} from 'lucide-react';

interface InventoryProductsColsProps {
	handleEditInventoryProduct: (inventoryProduct: InventoryProduct) => void;
	handleToggleStatus: (inventoryProductID: number, status: number) => void;
}

export const InventoryProductsCols = ({
	handleEditInventoryProduct,
	handleToggleStatus,
}: InventoryProductsColsProps) => {
	const columnDefinition: ColumnDef<InventoryProduct>[] = [
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
			accessorKey: 'supplier_id.name',
			header: () => <div className="justify-center uppercase">Supplier</div>,
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
			accessorKey: 'unit',
			header: () => <div className="justify-center uppercase">Unit</div>,
		},
		{
			accessorKey: 'bundles_count',
			header: () => (
				<div className="justify-center whitespace-nowrap uppercase">
					Bundles
				</div>
			),
		},
		{
			accessorKey: 'bundles_unit',
			header: () => (
				<div className="justify-center whitespace-nowrap uppercase">
					Bund. unit
				</div>
			),
		},
		{
			accessorKey: 'quantity_per_bundle',
			header: () => (
				<div className="justify-center whitespace-nowrap uppercase">
					Qty/Bund.
				</div>
			),
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
			accessorKey: 'damage_count',
			header: () => (
				<div className="justify-center whitespace-nowrap uppercase">
					Damaged
				</div>
			),
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
			accessorKey: 'transferred_stocks_count',
			header: () => (
				<div className="justify-center uppercase">Transferred</div>
			),
		},
		{
			accessorKey: 'sold_count',
			header: () => <div className="justify-center uppercase">Sold</div>,
		},
		{
			accessorKey: 'miscellaneous_count',
			header: () => <div className="justify-center uppercase">Misc</div>,
		},
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
				<div className="group relative mx-auto flex w-fit items-center justify-center">
					{row.original.status === 1 ? (
						<CheckCircle
							size={20}
							strokeWidth={2}
							className="text-green-600"
						/>
					) : (
						<Clock size={20} strokeWidth={2} className="text-gray-600" />
					)}
					<span className="text-nowrap absolute left-1/2 mx-auto -translate-x-1/2 -translate-y-7 rounded-md bg-gray-800 px-1 text-sm text-gray-100 opacity-0 transition-opacity group-hover:opacity-100">
						{!!row.original.status ? 'Approved' : 'Pending'}
					</span>
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

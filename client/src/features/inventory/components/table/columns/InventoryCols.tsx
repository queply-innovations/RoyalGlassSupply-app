import { ColumnDef } from '@tanstack/react-table';
import { Inventory } from '../../../types';
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
	Boxes,
	List,
	MoreVertical,
	Pencil,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface InventoryColsProps {
	handleViewItems: (inventory: Inventory) => void;
	handleViewDetails: (inventory: Inventory) => void;
	handleEditInventory: (inventory: Inventory) => void;
}

export const InventoryCols = ({
	handleViewItems,
	handleViewDetails,
	handleEditInventory,
}: InventoryColsProps) => {
	const { permissionListNames } = useAuth();

	const columnDefinition: ColumnDef<Inventory>[] = [
		{
			accessorKey: 'code',
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
							Code{' '}
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
			accessorKey: 'warehouse.code',
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
			accessorKey: 'date_received',
			header: () => <div className="justify-center uppercase">Received</div>,
		},
		{
			accessorKey: 'transfer_id',
			header: () => (
				<div className="justify-center uppercase">Transer Id</div>
			),
			cell: ({ row }) => {
				return (
					<div className="uppercase">
						<span>
							{row.original.transfer_id ? row.original.transfer_id : '—'}
						</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'created_by',
			header: () => (
				<div className="justify-center uppercase">Created by</div>
			),
			cell: ({ row }) => {
				return (
					<div className="uppercase">
						<span className="max-w-[25ch] truncate">
							{row.original.created_by.firstname}{' '}
							{row.original.created_by.lastname}
						</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'notes',
			header: () => <div className="justify-center uppercase">Notes</div>,
			cell: ({ row }) => {
				return (
					<div>
						<p className="max-w-[25ch] truncate">
							{row.original.notes ? row.original.notes : '—'}
						</p>
					</div>
				);
			},
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				const inventoryRow = row.original;
				return (
					<div className="flex flex-row justify-center text-xs font-normal uppercase">
						<DropdownMenu>
							<DropdownMenuTrigger className="overflow-clip rounded-full bg-gray-100 p-1.5 hover:bg-gray-300">
								<MoreVertical size={16} strokeWidth={2.25} />
							</DropdownMenuTrigger>
							<DropdownMenuContent className="relative z-50 w-44 bg-white">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuSeparator className="bg-gray-200" />
								{permissionListNames?.includes(
									'view_inventory_items',
								) && (
									<DropdownMenuItem
										onClick={() => {
											handleViewItems(inventoryRow);
										}}
										className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
									>
										<span className="flex w-6 items-center justify-center">
											<Boxes size={16} strokeWidth={2} />
										</span>
										<span>View items</span>
									</DropdownMenuItem>
								)}

								<DropdownMenuItem
									onClick={() => {
										handleViewDetails(inventoryRow);
									}}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										<List size={16} strokeWidth={2.25} />
									</span>
									<span>Details</span>
								</DropdownMenuItem>

								{permissionListNames?.includes('edit_inventory') && (
									<DropdownMenuItem
										onClick={() => {
											handleEditInventory(inventoryRow);
										}}
										className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
									>
										<span className="flex w-6 items-center justify-center">
											<Pencil size={16} strokeWidth={2.25} />
										</span>
										<span>Edit</span>
									</DropdownMenuItem>
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

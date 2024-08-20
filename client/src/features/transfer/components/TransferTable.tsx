import { DataTable } from '@/components/Tables/DataTable';
import { Transfer } from '../types';
import { ColumnDef } from '@tanstack/react-table';
import { FC, useMemo } from 'react';
import { useTransfer } from '../context/TransferContext';
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
	MoreVertical,
	Pencil,
	List,
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	Ban,
	Check,
	Clock,
	Printer,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface TransferTableProps {
	openModal: (data: Transfer, action: string) => void;
}

export const TransferTable: FC<TransferTableProps> = ({
	openModal,
}: TransferTableProps) => {
	const { transfers, transferProducts, isFetching, setSelectedTransfer } =
		useTransfer();
	const { permissionListNames } = useAuth();

	function printTransfer(transfer: Transfer) {
		window.api.transferSend({
			transfer: transfer,
			products: transferProducts.filter(
				prod => prod.transfer_id === transfer.id,
			),
		});
	}

	// Modal handler to expand transfer details
	const handleTransferDetails = (transfer: Transfer) => {
		setSelectedTransfer(transfer);
		openModal(transfer, 'details');
	};

	// Modal handler to edit transfer
	const handleEditTransfer = (transfer: Transfer) => {
		setSelectedTransfer(transfer);
		openModal(transfer, 'edit');
	};

	const handleTransferProducts = (transfer: Transfer) => {
		setSelectedTransfer(transfer);
		openModal(transfer, 'products');
	};

	const handleAddTransfer = () => {
		openModal({} as Transfer, 'add');
	};

	const TransferTableHeader: ColumnDef<Transfer>[] = [
		{
			accessorKey: 'code',
			sortingFn: 'alphanumeric',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="flex flex-row items-center bg-transparent text-black"
						>
							TRANSFER CODE{' '}
							{column.getIsSorted() === 'asc' ? (
								<ArrowUp />
							) : column.getIsSorted() === 'desc' ? (
								<ArrowDown />
							) : (
								<ArrowUpDown />
							)}
						</Button>
					</div>
				);
			},
			cell: ({ row }) => (
				<div className="text-center">
					{row.original.code ? row.original.code : 'N/A'}
				</div>
			),
		},

		{
			accessorKey: 'source',
			header: () => <div className="text-center">SOURCE-DESTINATION</div>,
			cell: ({ row }) => {
				const source: any = row.original.source;
				const destination: any = row.original.destination;
				return (
					<div className="text-center">
						{source.code}-{destination.code}
					</div>
				);
			},
		},

		{
			id: 'transfer_products',
			header: () => <div className="text-center">PRODUCTS ADDED?</div>,
			cell: () => {
				return (
					<div className="flex justify-center">
						{transferProducts.length > 0 ? (
							<Check
								size={20}
								strokeWidth={2}
								className="text-green-600"
							/>
						) : (
							<Ban size={20} strokeWidth={2} className="text-red-600" />
						)}
					</div>
				);
			},
		},

		{
			accessorKey: 'transfer_status',
			sortingFn: 'text',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="flex flex-row items-center bg-transparent text-black"
						>
							TRANSFER STATUS{' '}
							{column.getIsSorted() === 'asc' ? (
								<ArrowUp />
							) : column.getIsSorted() === 'desc' ? (
								<ArrowDown />
							) : (
								<ArrowUpDown />
							)}
						</Button>
					</div>
				);
			},
			cell: ({ row }) => (
				<div className="text-center">
					{row.original.transfer_status
						? row.original.transfer_status
						: 'N/A'}
				</div>
			),
		},

		{
			accessorKey: 'transfer_schedule',
			sortingFn: 'datetime',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="flex flex-row items-center bg-transparent text-black"
						>
							SCHEDULE{' '}
							{column.getIsSorted() === 'asc' ? (
								<ArrowUp />
							) : column.getIsSorted() === 'desc' ? (
								<ArrowDown />
							) : (
								<ArrowUpDown />
							)}
						</Button>
					</div>
				);
			},
			cell: ({ row }) => {
				const sched: any = row.getValue('transfer_schedule');
				if (sched.toString() !== '0000-00-00') {
					const details = {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					};
					const format = new Date(sched).toLocaleDateString([], details);
					return <div className="text-center">{format}</div>;
				} else {
					return <div className="text-center">N/A</div>;
				}
			},
		},

		{
			accessorKey: 'date_received',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="flex flex-row items-center bg-transparent text-black"
						>
							DATE RECEIVED{' '}
							{column.getIsSorted() === 'asc' ? (
								<ArrowUp />
							) : column.getIsSorted() === 'desc' ? (
								<ArrowDown />
							) : (
								<ArrowUpDown />
							)}
						</Button>
					</div>
				);
			},
			cell: ({ row }) => {
				const sched: any = row.getValue('date_received');
				if (sched) {
					const details = {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						hour: 'numeric',
						minute: 'numeric',
					};
					const format = new Date(sched).toLocaleDateString([], details);
					return <div className="text-center">{format}</div>;
				} else {
					return <div className="text-center">N/A</div>;
				}
			},
		},

		{
			accessorKey: 'approval_status',
			header: () => <div className="text-center">APPROVAL STATUS</div>,
			cell: ({ row }) => {
				return (
					<div className="mx-auto flex items-center justify-center">
						{row.original.approval_status.toLowerCase() === 'approved' ? (
							<Check
								size={20}
								strokeWidth={2}
								className="text-green-600"
							/>
						) : row.original.approval_status.toLowerCase() ===
						  'rejected' ? (
							<Ban size={20} strokeWidth={2} className="text-red-600" />
						) : (
							<Clock
								size={20}
								strokeWidth={2}
								className="text-amber-500"
							/>
						)}
					</div>
				);
			},
		},

		{
			id: 'actions',
			header: () => <div></div>,
			cell: ({ row }) => {
				const transferRow = row.original;
				return (
					<div className="flex flex-row text-xs font-normal uppercase">
						<DropdownMenu>
							<DropdownMenuTrigger className="overflow-clip rounded-full bg-gray-100 p-1.5 hover:bg-gray-300">
								<MoreVertical size={16} strokeWidth={2.25} />
							</DropdownMenuTrigger>
							<DropdownMenuContent className="relative z-50 w-44 bg-white">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuSeparator className="bg-gray-200" />
								<DropdownMenuItem
									onClick={() => handleTransferDetails(transferRow)}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										<List size={16} strokeWidth={2.25} />
									</span>
									<span>Transfer Details</span>
								</DropdownMenuItem>

								{permissionListNames?.includes('edit_transfer') && (
									<DropdownMenuItem
										onClick={() => handleEditTransfer(transferRow)}
										className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
									>
										<span className="flex w-6 items-center justify-center">
											<Pencil size={16} strokeWidth={2.25} />
										</span>
										<span>Edit Transfer</span>
									</DropdownMenuItem>
								)}

								<DropdownMenuSeparator className="bg-gray-200" />

								{[
									'add_transfer_product',
									'update_transfer_product',
								].every(permission =>
									permissionListNames?.includes(permission),
								) && (
									<DropdownMenuItem
										onClick={() =>
											handleTransferProducts(transferRow)
										}
										className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
									>
										<span className="flex w-6 items-center justify-center">
											{transferRow.transfer_status != 'arrived' &&
											transferRow.approval_status != 'rejected' ? (
												<Pencil size={16} strokeWidth={2.25} />
											) : (
												<List size={16} strokeWidth={2.25} />
											)}
										</span>
										<span>Transfer Products</span>
									</DropdownMenuItem>
								)}
								{/* dropdownmenuitem for transfer details and products to be printed 
								if transfer status is arrived/enroute */}
								{transferRow.transfer_status == 'enroute' ||
									(transferRow.transfer_status == 'arrived' && (
										<DropdownMenuItem
											onClick={() => printTransfer(transferRow)}
											className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
										>
											<span className="flex w-6 items-center justify-center">
												<Printer size={16} strokeWidth={2.25} />
											</span>
											<span>Print Transfer</span>
										</DropdownMenuItem>
									))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			},
		},
	];

	const transfersSorted = useMemo(() => {
		return transfers.sort((a, b) => {
			return b.id - a.id;
		});
	}, [transfers]);

	return (
		<>
			<DataTable
				data={transfersSorted}
				columns={TransferTableHeader}
				filterWhat={'approval_status'}
				dataType={'Transfer'}
				openModal={
					permissionListNames?.includes('add_transfer')
						? handleAddTransfer
						: undefined
				}
				isLoading={isFetching}
			/>
		</>
	);
};

export default TransferTable;

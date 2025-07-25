import { DataTable } from '@/components/Tables/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { FC } from 'react';
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
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTransfer } from '@/features/transfer/context/TransferContext';
import { Transfer } from '@/features/transfer/types';

interface TransferTableProps {
	openModal: (data: Transfer, action: string) => void;
}

export const TransferTable: FC<TransferTableProps> = ({ openModal }: TransferTableProps) =>{
	const { transfers, transferProducts, isFetching, progress, setSelectedTransfer } = useTransfer();

	const transferId = transferProducts.map(prod => { 
		return { 
			transfer_id: prod.transfer_id 
		} 
	});

	const filteredTransfersInit = transfers.filter((transfer) => 
		{
			if (transferId.some(id => id.transfer_id === transfer.id)) {
				return transfer;
			}
		}
	);

	const filteredTransfers = filteredTransfersInit.filter((transfer) => { 
		if (transfer.approval_status === 'pending') return transfer;
	});

	const { auth } = useAuth();

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

	const handleTransfer = () => {
		openModal({} as Transfer, 'add');
	};
	
	const TransferTableHeader: ColumnDef<Transfer>[] = [
		{
			accessorKey: 'code',
			sortingFn: "alphanumeric",
			enableSorting: true,
			header:	({ column }) => {
				return (
					<div>
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="flex flex-row bg-transparent text-black items-center"
						>
							TRANSFER CODE {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				);
			},
			cell: ({ row }) => (
				<div>{row.original.code ? row.original.code : 'N/A'}</div>
			),
		},

		{
			accessorKey: 'source',
			header:	() => <div className="text-center">SOURCE-DESTINATION</div>,
			cell: ({ row }) => {
				const source: any = row.original.source;
				const destination: any = row.original.destination;
				return (
					<div className="text-center">{source.code}-{destination.code}</div>
				);
			},
		},

		{
			accessorKey: 'transfer_status',
			sortingFn: "text",
			enableSorting: true,
			header:	({ column }) => {
				return (
					<div className="flex justify-center">
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="flex flex-row bg-transparent text-black items-center z-10"
						>
							TRANSFER STATUS {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				);
			},
			cell: ({ row }) => (
				<div className="text-center">{row.original.transfer_status ? row.original.transfer_status : 'N/A'}</div>
			),
		},

		{
			accessorKey: 'transfer_schedule',
			sortingFn: "datetime",
			enableSorting: true,
			header:	({ column }) => {
				return (
					<div className="flex justify-center">
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="flex flex-row bg-transparent text-black items-center z-10"
						>
							SCHEDULE {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				);
			},
			cell: ({ row }) => {
				const sched: any = row.getValue('transfer_schedule');
				if (sched.toString() !== '0000-00-00 00:00:00') {
					const details = { 
						year: 'numeric', 
						month: 'long', 
						day: 'numeric', };
					const format = new Date(sched).toLocaleDateString([], details);
					return (
						<div className="text-center">{format}</div>
					);
				} else {
					return (
						<div className="text-center">N/A</div>
					);
				}
			},
		},

		{
			accessorKey: 'approval_status',
			header:	() => <div className="text-center">APPROVAL STATUS</div>,
			cell: ({ row }) => {
				return (
					<div className="flex mx-auto items-center justify-center">
						{
							row.original.approval_status.toLowerCase() === 'approved' ? ( 
								<Check
									size={20}
									strokeWidth={2}
									className="text-green-600"
								/> 
							) : row.original.approval_status.toLowerCase() === 'rejected' ? (
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
							)
						}
					</div>
				);
			},
		},

		{
			id: 'actions',
			header:	() => <div></div>,
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
									<span>Details</span>
								</DropdownMenuItem>
								{auth.role?.toLowerCase() != 'encoder' && (
									<DropdownMenuItem
										onClick={() => handleEditTransfer(transferRow)}
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
										<span>Edit</span>
									</DropdownMenuItem>
								)}
								<DropdownMenuSeparator className="bg-gray-200" />

								<DropdownMenuItem
									onClick={() => handleTransferProducts(transferRow)}
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
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			}
		}

	];

	return (
		<>
			<DataTable
				data={filteredTransfers}
				columns={TransferTableHeader}
				filterWhat={"approval_status"}
				dataType={""}
				openModal={undefined}
				isLoading={isFetching} />
		</>
	);
};

export default TransferTable;
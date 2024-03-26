import { DataTable } from '@/components/Tables/DataTable';
import { Transfer } from '../types';
import { ColumnDef } from '@tanstack/react-table';
import { FC } from 'react';
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
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface TransferTableProps {
	openModal: (data: Transfer, action: string) => void;
}

export const TransferTable: FC<TransferTableProps> = ({ openModal }: TransferTableProps) =>{
	const { transfers, transferProducts, isFetching, setSelectedTransfer } = useTransfer();
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

	const handleAddTransfer = () => {
		openModal({} as Transfer, 'add');
	};
	
	const TransferTableHeader: ColumnDef<Transfer>[] = [
		{
			id: "select",
			header: ({ table }) => (
				<input type="checkbox" 
					checked={table.getIsAllPageRowsSelected()}
					onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<input type="checkbox" 
					checked={row.getIsSelected()}
					onChange={(e) => row.toggleSelected(!!e.target.checked)}
					aria-label="Select row"
					className="justify-center"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},

		{
			accessorKey: 'id',
			sortingFn: "basic",
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
							TRANSFER ID {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				);
			},
			cell: ({ row }) => (
				<div className="text-center">{row.original.id}</div>
			),
		},

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
				<div className="text-center">{row.original.code ? row.original.code : 'N/A'}</div>
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
			id: 'transfer_products',
			header:	() => <div className="text-center">PRODUCTS ADDED?</div>,
			cell: ({ row }) => {
				return (
					<div className="flex justify-center">
						{
							transferProducts.filter((prod) => prod.transfer_id === row.original.id).length > 0 ? (
								<Check
									size={20}
									strokeWidth={2}
									className="text-green-600"
								/>
							) : (
								<Ban
									size={20}
									strokeWidth={2}
									className="text-red-600"
								/>
							)
						}
					</div>
				);
			},
		},

		{
			accessorKey: 'transfer_status',
			sortingFn: "text",
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
					<div>
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="flex flex-row bg-transparent text-black items-center"
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
						day: 'numeric', 
						hour:'numeric',
						minute:'numeric' };
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
			accessorKey: 'date_received',
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
							DATE RECEIVED {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
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
						hour:'numeric',
						minute:'numeric' };
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

		// {
		// 	accessorKey: 'approved_by',
		// 	header:	() => <div className="text-center">APPROVED / REJECTED BY</div>,
		// 	cell: ({ row }) => {
		// 		const approved_by: any = row.getValue('approved_by');
		// 		if (approved_by){
		// 			const format = approved_by.firstname + ' ' + approved_by.lastname;
		// 			return (
		// 				<div id={approved_by.id} className="text-center">{format}</div>
		// 			);
		// 		} else {
		// 			return (<div className="text-center">N/A</div>);
		// 		}
		// 	},
		// },

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
									<span>Transfer Details</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => handleEditTransfer(transferRow)}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										<Pencil size={16} strokeWidth={2.25} />
									</span>
									<span>Edit Transfer</span>
								</DropdownMenuItem>

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
				data={transfers}
				columns={TransferTableHeader}
				filterWhat={"approval_status"}
				dataType={"Transfer"}
				openModal={handleAddTransfer}
				isLoading={isFetching} />
		</>
	);
};

export default TransferTable;
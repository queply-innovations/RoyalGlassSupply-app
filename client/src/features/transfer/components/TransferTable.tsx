import { SortIcon } from '@/assets/icons';
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
} from 'lucide-react';

interface TransferTableProps {
	openModal: (data: Transfer, action: string) => void;
}

export const TransferTable: FC<TransferTableProps> = ({ openModal }: TransferTableProps) =>{
	const { transfers, isFetching, progress, setSelectedTransfer } = useTransfer();

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

	// console.log(transfers);
	
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
			header:	() => <div>TRANSFER ID</div>,
		},

		{
			accessorKey: 'code',
			header:	() => <div>TRANSFER CODE</div>,
		},

		// {
		// 	accessorKey: 'created_by',
		// 	header:	() => <div>CREATED BY</div>,
		// 	cell: ({ row }) => {
		// 		const created_by: any = row.getValue('created_by');
		// 		const format = created_by.firstname + ' ' + created_by.lastname;
		// 		return (
		// 			<div id={created_by.id}>{format}</div>
		// 		);
		// 	},
		// },

		{
			accessorKey: 'source',
			header:	() => <div>SOURCE-DESTINATION</div>,
			cell: ({ row }) => {
				const source: any = row.original.source;
				const destination: any = row.original.destination;
				return (
					<div>{source.code}-{destination.code}</div>
				);
			},
		},

		{
			accessorKey: 'transfer_status',
			header:	() => <div>TRANSFER STATUS</div>,
		},

		{
			accessorKey: 'transfer_schedule',
			header:	() => <div>SCHEDULE</div>,
			cell: ({ row }) => {
				const sched: any = row.getValue('transfer_schedule');
				const details = { year: 'numeric', month: 'long', day: 'numeric' };
				const format = new Date(sched).toLocaleDateString([], details);
				return (
					<div>{format}</div>
				);
			},
		},

		{
			accessorKey: 'date_received',
			header:	() => <div>DATE RECEIVED</div>,
			cell: ({ row }) => {
				const sched: any = row.getValue('date_received');
				const details = { 
					year: 'numeric', 
					month: 'long', 
					day: 'numeric', 
					hour:'numeric',
					minute:'numeric',
					second:'numeric' };
				const format = new Date(sched).toLocaleDateString([], details);
				return (
					<div>{format}</div>
				);
			},
		},

		{
			accessorKey: 'approval_status',
			header:	() => <div>APPROVAL STATUS</div>,
		},

		{
			accessorKey: 'approved_by',
			header:	() => <div>APPROVED BY</div>,
			cell: ({ row }) => {
				const approved_by: any = row.getValue('approved_by');
				const format = approved_by.firstname + ' ' + approved_by.lastname;
				return (
					<div id={approved_by.id}>{format}</div>
				);
			},
		},

		// {
		// 	accessorKey: 'received_by',
		// 	header:	() => <div>RECEIVED BY</div>,
		// 	cell: ({ row }) => {
		// 		const received_by: any = row.getValue('received_by');
		// 		const format = received_by.firstname + ' ' + received_by.lastname;
		// 		return (
		// 			<div>{format}</div>
		// 		);
		// 	},
		// },

		// {
		// 	accessorKey: 'created_at',
		// 	header:	() => <div>CREATED AT</div>,
		// 	cell: ({ row }) => {
		// 		const sched: any = row.getValue('created_at');
		// 		const details = { year: 'numeric', month: 'long', day: 'numeric' };
		// 		const format = new Date(sched).toLocaleDateString([], details);
		// 		return (
		// 			<div>{format}</div>
		// 		);
		// 	},
		// },

		// {
		// 	accessorKey: 'updated_at',
		// 	header:	() => <div>UPDATED AT</div>,
		// 	cell: ({ row }) => {
		// 		const sched: any = row.getValue('updated_at');
		// 		const details = { year: 'numeric', month: 'long', day: 'numeric' };
		// 		const format = new Date(sched).toLocaleDateString([], details);
		// 		return (
		// 			<div>{format}</div>
		// 		);
		// 	},
		// },

		// {
		// 	accessorKey: 'notes',
		// 	header:	() => <div>NOTES</div>,
		// 	cell: ({ row }) => {
		// 		if (row.getValue('notes')) {
		// 			return (
		// 				<div>{row.getValue('notes')}</div>
		// 			);
		// 		} else {
		// 			return (
		// 				<div>N/A</div>
		// 			);
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
									<span>Details</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => handleEditTransfer(transferRow)}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										<Pencil size={16} strokeWidth={2.25} />
									</span>
									<span>Edit</span>
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
				openModal={openModal}
				isLoading={isFetching}
				progress={progress} />
		</>
	);
};

export default TransferTable;
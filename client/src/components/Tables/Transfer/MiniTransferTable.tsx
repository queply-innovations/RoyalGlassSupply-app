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
import { Transfer } from '@/features/transfer/types';
import { useTransfer } from '@/features/transfer/context/TransferContext';

export const MiniTransferTable = () =>{
	const { transfers, isFetching } = useTransfer();
	
	const TransferTableHeader: ColumnDef<Transfer>[] = [
		{
			accessorKey: 'code',
			header:	({ column }) => {
				return (
					<div className="text-center">
						TRANSFER CODE
					</div>
				);
			},
			cell: ({ row }) => (
				<div className="text-center">{row.original.code ? row.original.code : 'N/A'}</div>
			),
		},

		{
			accessorKey: 'transfer_status',
			header:	({ column }) => {
				return (
					<div className="text-center"> TRANSFER STATUS </div>
				);
			},
			cell: ({ row }) => (
				<div className="text-center">{row.original.transfer_status ? row.original.transfer_status : 'N/A'}</div>
			),
		},

		{
			accessorKey: 'transfer_schedule',
			header:	({ column }) => {
				return ( <div className="text-center"> SCHEDULE </div> );
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

	];

	return (
		<>
			<DataTable
				data={transfers.slice(-3).reverse()}
				columns={TransferTableHeader}
				filterWhat={"approval_status"}
				dataType={"Transfer"}
				openModal={undefined}
				isLoading={isFetching}
				hidePagination={true}
				hideFilter={true} />
		</>
	);
};

export default MiniTransferTable;
import { SortIcon } from '@/assets/icons';
import { Button } from '@/components/Button';
import { DataTable } from '@/components/Tables/DataTable';
import { Transfer } from '../types';
import { ColumnDef } from '@tanstack/react-table';
import { FC } from 'react';
import { useTransfer } from '../context/TransferContext';

interface TransferTableProps {
	openModal: (data: Transfer, action: string) => void;
}

export const TransferTable: FC<TransferTableProps> = ({ openModal }: TransferTableProps) =>{
	const { transfers, isFetching, progress } = useTransfer();
	
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
			accessorKey: 'created_by', //TODO: Add last name with first name and place here
			header:	() => <div>CREATED BY</div>,
		},

		{
			accessorKey: 'source', //TODO: Get warehouse ID and change to location
			header:	() => <div>SOURCE</div>,
		},

		{
			accessorKey: 'destination', //TODO: Get warehouse ID and change to location
			header:	() => <div>DESTINATION</div>,
		},

		{
			accessorKey: 'transfer_schedule',
			header:	() => <div>SCHEDULE</div>,
		},

		{
			accessorKey: 'approval_status',
			header:	() => <div>APPROVAL STATUS</div>,
		},

		{
			accessorKey: 'approval_by',
			header:	() => <div>APPROVAL BY</div>,
		},

		{
			accessorKey: 'transfer_status',
			header:	() => <div>TRANSFER STATUS</div>,
		},

		{
			accessorKey: 'date_received',
			header:	() => <div>DATE RECEIVED</div>,
		},

		{
			accessorKey: 'received_by', //TODO: Add last name with first name and place here
			header:	() => <div>RECEIVED BY</div>,
		},

		{
			accessorKey: 'created_at',
			header:	() => <div>CREATED AT</div>,
		},

		{
			accessorKey: 'updated_at',
			header:	() => <div>UPDATED AT</div>,
		},

		{
			id: 'actions',
			header:	() => <div>ACTION</div>,
			cell: ({ row }) => {
				const transferRow = row.original;
				return (
					<div className="flex flex-row text-xs font-normal uppercase">
						<Button fill={'yellow'} textColor={'black'}>
							Edit Details
						</Button>
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
				filterWhat={"created_by"}
				dataType={"Transfer"}
				openModal={openModal}
				isLoading={isFetching}
				progress={progress} />
		</>
	);
};

export default TransferTable;
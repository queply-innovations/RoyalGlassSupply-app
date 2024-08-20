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
} from 'lucide-react';
import { ReturnTransactionsRaw } from '../types';
import { useReturn } from '../context';

interface PendingReturnTableProps {
	openModal: (data: ReturnTransactionsRaw, action: string) => void;
}

export const PendingReturnTable: FC<PendingReturnTableProps> = ({
	openModal,
}: PendingReturnTableProps) => {
	const { returns, setSelectedReturn, isFetching } = useReturn();

	const handleReturnDetails = (returnItem: ReturnTransactionsRaw) => {
		setSelectedReturn(returnItem);
		openModal(returnItem, 'details');
	};

	const handleEditReturn = (returnItem: ReturnTransactionsRaw) => {
		setSelectedReturn(returnItem);
		openModal(returnItem, 'edit');
	};

	const PendingReturnTableHeader: ColumnDef<ReturnTransactionsRaw>[] = [
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
							className="mx-auto flex flex-row items-center bg-transparent text-black"
						>
							RETURN CODE{' '}
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
			accessorKey: 'customer',
			sortingFn: 'alphanumeric',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="mx-auto flex flex-row items-center bg-transparent text-black"
						>
							CUSTOMER NAME{' '}
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
					{row.original.invoice.customer.firstname +
						' ' +
						row.original.invoice.customer.lastname}
				</div>
			),
		},

		{
			accessorKey: 'total_amount_due',
			sortingFn: 'text',
			enableSorting: true,
			header: () => {
				return (
					<div className="mx-auto flex flex-row justify-center text-center">
						{' '}
						TOTAL AMOUNT DUE{' '}
					</div>
				);
			},
			cell: ({ row }) => {
				const amount = row.original.invoice.total_amount_due;
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'PHP',
				}).format(amount);

				return <div className="text-center">{formatted}</div>;
			},
		},

		{
			accessorKey: 'refundable_amount',
			sortingFn: 'text',
			enableSorting: true,
			header: () => {
				return (
					<div className="mx-auto flex flex-row justify-center text-center">
						{' '}
						REFUNDABLE AMOUNT{' '}
					</div>
				);
			},
			cell: ({ row }) => {
				const amount = row.original.refundable_amount;
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'PHP',
				}).format(amount);

				return <div className="text-center">{formatted}</div>;
			},
		},

		{
			id: 'actions',
			header: () => <div></div>,
			cell: ({ row }) => {
				const returnRow = row.original;
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
									onClick={() => handleReturnDetails(returnRow)}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										<List size={16} strokeWidth={2.25} />
									</span>
									<span>View details</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => handleEditReturn(returnRow)}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										<Pencil size={16} strokeWidth={2.25} />
									</span>
									<span>Set approval</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			},
		},
	];

	return (
		<>
			<DataTable
				data={returns?.sort((a, b) => b.id - a.id) || []}
				columns={PendingReturnTableHeader}
				filterWhat={''}
				hideFilter={true}
				dataType={''}
				openModal={undefined}
				isLoading={isFetching}
			/>
		</>
	);
};

export default PendingReturnTable;

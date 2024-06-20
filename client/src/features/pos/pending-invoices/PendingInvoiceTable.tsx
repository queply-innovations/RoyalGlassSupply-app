import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPendingInvoices } from './api/PendingInvoice';
import { DataTable } from '@/components/Tables/DataTable';

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
	List,
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
} from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

const PendingInvoiceTable = ({
	openModal,
	setSelectedInvoice,
	setModalAction,
}: {
	openModal: any;
	setSelectedInvoice: React.Dispatch<React.SetStateAction<any>>;
	setModalAction: React.Dispatch<React.SetStateAction<'details' | 'approve'>>;
}) => {
	const { data: listOfPendingInvoices, isLoading } = useQuery({
		queryKey: ['pending-invoices'],
		queryFn: fetchPendingInvoices,
	});

	const PendingReturnTableHeader: ColumnDef<any>[] = [
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
							INVOICE CODE{' '}
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
			cell: ({ row }) => {
				return (
					<div className="text-center">{`${row.original.customer.firstname} ${row.original.customer.lastname}`}</div>
				);
			},
		},

		{
			accessorKey: 'discount_amount',
			sortingFn: 'text',
			enableSorting: true,
			header: () => {
				return (
					<div className="mx-auto flex flex-row justify-center text-center">
						DISCOUNT AMOUNT
					</div>
				);
			},
			cell: ({ row }) => {
				const amount = row.original.total_discount;
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'PHP',
				}).format(amount);

				return <div className="text-center">{formatted}</div>;
			},
		},
		{
			accessorKey: 'subtotal',
			sortingFn: 'text',
			enableSorting: true,
			header: () => {
				return (
					<div className="mx-auto flex flex-row justify-center text-center">
						SUBTOTAL
					</div>
				);
			},
			cell: ({ row }) => {
				const amount = row.original.subtotal;
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'PHP',
				}).format(amount);

				return <div className="text-center">{formatted}</div>;
			},
		},
		{
			accessorKey: 'total_amount_due',
			sortingFn: 'text',
			enableSorting: true,
			header: () => {
				return (
					<div className="mx-auto flex flex-row justify-center text-center">
						TOTAL AMOUNT DUE
					</div>
				);
			},
			cell: ({ row }) => {
				const amount = row.original.total_amount_due;
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'PHP',
				}).format(amount);

				return <div className="text-center">{formatted}</div>;
			},
		},
		{
			accessorKey: 'paid_amount',
			sortingFn: 'text',
			enableSorting: true,
			header: () => {
				return (
					<div className="mx-auto flex flex-row justify-center text-center">
						PAID AMOUNT
					</div>
				);
			},
			cell: ({ row }) => {
				const amount = row.original.paid_amount;
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
				const invoiceRow = row.original;
				return (
					<div className="flex flex-row text-xs font-normal uppercase">
						<DropdownMenu>
							<DropdownMenuTrigger className="overflow-clip rounded-full bg-gray-100 p-1.5 hover:bg-gray-300">
								<MoreVertical size={16} strokeWidth={2.25} />
							</DropdownMenuTrigger>
							<DropdownMenuContent className="relative z-50 w-44 bg-white">
								<DropdownMenuLabel className="text-center">
									Actions
								</DropdownMenuLabel>
								<DropdownMenuSeparator className="bg-gray-200" />
								<DropdownMenuItem
									onClick={() => {
										setSelectedInvoice(invoiceRow);
										setModalAction('details');
										openModal();
									}}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="w-15 flex items-center justify-center">
										<List size={18} strokeWidth={2} />
									</span>
									<span>Details</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			},
		},
	];

	return (
		<DataTable
			data={listOfPendingInvoices || []}
			columns={PendingReturnTableHeader}
			filterWhat={''}
			hideFilter={true}
			dataType={''}
			openModal={undefined}
			isLoading={isLoading}
		/>
	);
};

export default PendingInvoiceTable;

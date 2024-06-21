import React from 'react';
import { DataTable } from '@/components/Tables/DataTable';

import { Button } from '@/components';

import { List, ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Invoices } from '@/features/invoice/__test__/types';
import { formatUTCDate } from '@/utils/timeUtils';

const PendingInvoiceTable = ({
	data,
	isLoading,
	openModal,
	setSelectedInvoice,
	setModalAction,
}: {
	data: Invoices[] | undefined;
	isLoading: boolean;
	openModal: any;
	setSelectedInvoice: React.Dispatch<React.SetStateAction<any>>;
	setModalAction: React.Dispatch<React.SetStateAction<'details' | 'approve'>>;
}) => {
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
							CUSTOMER{' '}
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
						DISCOUNT
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
			accessorKey: 'created_at',
			sortingFn: 'text',
			enableSorting: true,
			header: () => {
				return (
					<div className="mx-auto flex flex-row justify-center text-center">
						Created at
					</div>
				);
			},
			cell: ({ row }) => (
				<div className="text-center">
					{formatUTCDate(row.original.created_at)}
				</div>
			),
		},

		{
			id: 'view_items',
			header: () => <div></div>,
			cell: ({ row }) => {
				const invoiceRow = row.original;
				return (
					<Button
						className="overflow-clip rounded-full bg-gray-100 p-1.5 hover:bg-gray-300"
						onClick={() => {
							setSelectedInvoice(invoiceRow);
							setModalAction('details');
							openModal();
						}}
					>
						<span className="w-15 flex items-center justify-center text-black">
							<List size={16} strokeWidth={2.5} />
						</span>
					</Button>
				);
			},
		},
	];

	return (
		<DataTable
			data={data || []}
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

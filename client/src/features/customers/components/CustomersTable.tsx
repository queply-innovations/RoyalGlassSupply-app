import { Button } from '@/components/Button';
import { DataTable } from '@/components/Tables/DataTable';
import { CustomerSales } from '../types';
import { ColumnDef } from '@tanstack/react-table';
import { useCustomers } from '../context/CustomersContext';

import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

export const UserSalesTable = () => {
	const { customersList, isFetching } = useCustomers();

	const UserSalesTableHeader: ColumnDef<CustomerSales>[] = [
		{
			accessorKey: 'customer.firstname',
			id: 'customer',
			sortingFn: 'text',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<Button
						onClick={() => {
							column.toggleSorting(column.getIsSorted() === 'asc');
						}}
						className="flex flex-row items-center bg-transparent text-slate-800"
					>
						NAME{' '}
						{column.getIsSorted() === 'asc' ? (
							<ArrowUp />
						) : column.getIsSorted() === 'desc' ? (
							<ArrowDown />
						) : (
							<ArrowUpDown />
						)}
					</Button>
				);
			},
			cell: ({ row }) => (
				<div>
					{row.original.customer.firstname +
						' ' +
						row.original.customer.lastname}
				</div>
			),
		},

		{
			id: 'address',
			header: () => <div>ADDRESS</div>,
			cell: ({ row }) => <div>{row.original.customer.address}</div>,
		},

		{
			id: 'contact_no',
			header: () => <div>CONTACT NO</div>,
			cell: ({ row }) => <div>{row.original.customer.contact_no}</div>,
		},

		{
			accessorKey: 'customer.total_balance',
			id: 'total_balance',
			sortingFn: 'basic',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<Button
						onClick={() => {
							column.toggleSorting(column.getIsSorted() === 'asc');
						}}
						className="flex flex-row items-center bg-transparent text-slate-800"
					>
						BALANCE{' '}
						{column.getIsSorted() === 'asc' ? (
							<ArrowUp />
						) : column.getIsSorted() === 'desc' ? (
							<ArrowDown />
						) : (
							<ArrowUpDown />
						)}
					</Button>
				);
			},
			cell: ({ row }) => (
				<div>
					{Intl.NumberFormat('en-PH', {
						style: 'currency',
						currency: 'PHP',
					}).format(row.original.customer.total_balance)}
				</div>
			),
		},

		{
			accessorKey: 'customer.total_credit',
			id: 'total_credit',
			sortingFn: 'basic',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<Button
						onClick={() => {
							column.toggleSorting(column.getIsSorted() === 'asc');
						}}
						className="flex flex-row items-center bg-transparent text-slate-800"
					>
						CREDITS{' '}
						{column.getIsSorted() === 'asc' ? (
							<ArrowUp />
						) : column.getIsSorted() === 'desc' ? (
							<ArrowDown />
						) : (
							<ArrowUpDown />
						)}
					</Button>
				);
			},
			cell: ({ row }) => (
				<div>
					{Intl.NumberFormat('en-PH', {
						style: 'currency',
						currency: 'PHP',
					}).format(row.original.customer.total_credit)}
				</div>
			),
		},

		{
			accessorKey: 'total_transactions',
			id: 'total_transactions',
			sortingFn: 'basic',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<Button
						onClick={() => {
							column.toggleSorting(column.getIsSorted() === 'asc');
						}}
						className="flex flex-row items-center bg-transparent text-slate-800"
					>
						TRANSACTIONS{' '}
						{column.getIsSorted() === 'asc' ? (
							<ArrowUp />
						) : column.getIsSorted() === 'desc' ? (
							<ArrowDown />
						) : (
							<ArrowUpDown />
						)}
					</Button>
				);
			},
			cell: ({ row }) => <div>{row.original.total_transactions}</div>,
		},

		{
			accessorKey: 'total_sales',
			id: 'amount_sales',
			sortingFn: 'basic',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<Button
						onClick={() => {
							column.toggleSorting(column.getIsSorted() === 'asc');
						}}
						className="flex flex-row items-center bg-transparent text-slate-800"
					>
						SALES{' '}
						{column.getIsSorted() === 'asc' ? (
							<ArrowUp />
						) : column.getIsSorted() === 'desc' ? (
							<ArrowDown />
						) : (
							<ArrowUpDown />
						)}
					</Button>
				);
			},
			cell: ({ row }) => (
				<div>
					{Intl.NumberFormat('en-PH', {
						style: 'currency',
						currency: 'PHP',
					}).format(row.original.total_sales)}
				</div>
			),
		},
	];

	return (
		<>
			<DataTable
				data={customersList.sort((a, b) =>
					b.total_sales > a.total_sales ? 1 : -1,
				)}
				columns={UserSalesTableHeader}
				filterWhat={'customer'}
				dataType={'customer'}
				openModal={undefined}
				isLoading={isFetching}
			/>
		</>
	);
};

export default UserSalesTable;

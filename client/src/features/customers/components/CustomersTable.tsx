import { Button } from '@/components/Button';
import { DataTable } from '@/components/Tables/DataTable';
import { CustomerSale } from '../types';
import { ColumnDef } from '@tanstack/react-table';
import { useCustomers } from '../context/CustomersContext';

import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

export const UserSalesTable = () => {
	const { customers, isFetching } = useCustomers();

	const UserSalesTableHeader: ColumnDef<CustomerSale>[] = [
		{
			id: 'customer_name',
			accessorFn: row => row.firstname + ' ' + row.lastname,
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
		},

		{
			id: 'address',
			header: () => <div>ADDRESS</div>,
			cell: ({ row }) => <div>{row.original.address}</div>,
		},

		{
			id: 'contact_no',
			header: () => <div>CONTACT NO</div>,
			cell: ({ row }) => <div>{row.original.contact_no}</div>,
		},

		{
			accessorKey: 'total_balance',
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
					}).format(row.original.total_balance)}
				</div>
			),
		},

		{
			accessorKey: 'total_credit',
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
					}).format(row.original.total_credit)}
				</div>
			),
		},

		// {
		// 	accessorKey: 'total_transactions',
		// 	id: 'total_transactions',
		// 	sortingFn: 'basic',
		// 	enableSorting: true,
		// 	header: ({ column }) => {
		// 		return (
		// 			<Button
		// 				onClick={() => {
		// 					column.toggleSorting(column.getIsSorted() === 'asc');
		// 				}}
		// 				className="flex flex-row items-center bg-transparent text-slate-800"
		// 			>
		// 				TRANSACTIONS{' '}
		// 				{column.getIsSorted() === 'asc' ? (
		// 					<ArrowUp />
		// 				) : column.getIsSorted() === 'desc' ? (
		// 					<ArrowDown />
		// 				) : (
		// 					<ArrowUpDown />
		// 				)}
		// 			</Button>
		// 		);
		// 	},
		// 	cell: ({ row }) => <div>{row.original.total_transactions}</div>,
		// },

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
				data={
					customers?.sort((a, b) =>
						b.total_sales > a.total_sales ? 1 : -1,
					) || []
				}
				columns={UserSalesTableHeader}
				filterWhat={'customer_name'}
				dataType={'customer'}
				openModal={undefined}
				isLoading={isFetching}
			/>
		</>
	);
};

export default UserSalesTable;

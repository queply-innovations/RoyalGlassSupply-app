import { Button } from '@/components/Button';
import { DataTable } from '@/components/Tables/DataTable';
import { Invoice, Customer, CustomerSales } from '../types';
import { ColumnDef } from '@tanstack/react-table';
import { FC } from 'react';
import { useCustomers } from '../context/CustomersContext';
import {
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

interface UserSalesTableProps {
	openModal: (data: Customer, action: string) => void;
}

export const UserSalesTable: FC<UserSalesTableProps> = ({
	openModal,
}: UserSalesTableProps) => {
	const { customersList, isFetching } = useCustomers();

	// const handleInvoiceDetails = (invoice: Customer) => {
	// 	setSelectedInvoice(invoice.invoices);
	// 	openModal(invoice, 'details');
	// };

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

		// {
		// 	id: 'actions',
		// 	header: () => <div></div>,
		// 	cell: ({ row }) => {
		// 		const userSalesRow = row.original;
		// 		return (
		// 			<div className="flex flex-row text-xs font-normal uppercase">
		// 				<DropdownMenu>
		// 					<DropdownMenuTrigger className="overflow-clip rounded-full bg-gray-100 p-1.5 hover:bg-gray-300">
		// 						<MoreVertical size={16} strokeWidth={2.25} />
		// 					</DropdownMenuTrigger>
		// 					<DropdownMenuContent className="relative z-50 bg-white w-44">
		// 						<DropdownMenuLabel>Actions</DropdownMenuLabel>
		// 						<DropdownMenuSeparator className="bg-gray-200" />
		// 						<DropdownMenuItem
		// 							onClick={() => handleInvoiceDetails(userSalesRow)}
		// 							className="flex flex-row items-center gap-3 p-2 rounded-md hover:bg-gray-200"
		// 						>
		// 							<span className="flex items-center justify-center w-6">
		// 								<List size={16} strokeWidth={2.25} />
		// 							</span>
		// 							<span>Details</span>
		// 						</DropdownMenuItem>
		// 					</DropdownMenuContent>
		// 				</DropdownMenu>
		// 			</div>
		// 		);
		// 	},
		// },
	];

	return (
		<>
			<DataTable
				data={customersList.sort((a, b) =>
					b.total_sales > a.total_sales ? 1 : -1,
				)}
				columns={UserSalesTableHeader}
				filterWhat={''}
				hideFilter={true}
				dataType={''}
				openModal={undefined}
				isLoading={isFetching}
			/>
		</>
	);
};

export default UserSalesTable;

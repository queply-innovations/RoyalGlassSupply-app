import { Button } from '@/components/Button';
import { DataTable } from '@/components/Tables/DataTable';
import { Invoice, Customer } from '../types';
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
	Pencil,
	List,
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	Ban,
	Check,
	Clock,
} from 'lucide-react';

interface UserSalesTableProps {
	openModal: (data: Customer, action: string) => void;
}

export const UserSalesTable: FC<UserSalesTableProps> = ({ openModal }: UserSalesTableProps) =>{
	const { invoices, isFetching, customers, setSelectedInvoice } = useCustomers();

	const handleInvoiceDetails = (invoice: Customer) => {
		setSelectedInvoice(invoice.invoices);
		openModal(invoice, 'details');
	};
	
	const UserSalesTableHeader: ColumnDef<Customer>[] = [
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
			accessorKey: 'customer',
			sortingFn: "text",
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() => {
								column.toggleSorting(column.getIsSorted() === "asc"); 
							}}
							className="bg-transparent text-black flex flex-row items-center ml-auto mr-auto"
						>
							FULL NAME {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				)
			},
			cell: ({ row }) => (
				<div className="text-center">
					{row.original.invoices[0].customer.firstname + 
						" " + row.original.invoices[0].customer.lastname}
				</div>
			),
		},

		{
			id: 'total_sales',
			sortingFn: "basic",
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() => {
								column.toggleSorting(column.getIsSorted() === "asc"); 
							}}
							className="bg-transparent text-black flex flex-row items-center ml-auto mr-auto"
						>
							NUMBER OF PURCHASES {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				)
			},
			cell: ({ row }) => (
				<div className="text-center">
					{row.original.invoices.length}
				</div>
			),
		},

		{
			id: 'amount_sales',
			sortingFn: "basic",
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() => {
								column.toggleSorting(column.getIsSorted() === "asc"); 
							}}
							className="bg-transparent text-black flex flex-row items-center ml-auto mr-auto"
						>
							TOTAL AMOUNT OF PURCHASES {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				)
			},
			cell: ({ row }) => {
				// const initial = row.original.invoices.filter((invoice) => invoice.status === "approved");

				const total = row.original.invoices.reduce(
					(total: number, invoice: Invoice) => 
						total + invoice.paid_amount
					, 0);

				const formatted = new Intl.NumberFormat("en-US", {
						style: "currency",
						currency: "PHP",
					}).format(total);
				
				return(
					<div className="text-center">
						{formatted}
					</div>
				);
			},
		},

		{
			id: 'actions',
			header:	() => <div></div>,
			cell: ({ row }) => {
				const userSalesRow = row.original;
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
									onClick={() => handleInvoiceDetails(userSalesRow)}
									className="flex flex-row items-center gap-3 rounded-md p-2 hover:bg-gray-200"
								>
									<span className="flex w-6 items-center justify-center">
										<List size={16} strokeWidth={2.25} />
									</span>
									<span>Details</span>
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
				data={customers}
				columns={UserSalesTableHeader}
				filterWhat={''}
				hideFilter={true}
				dataType={""}
				openModal={undefined}
				isLoading={isFetching} />
		</>
	);
};

export default UserSalesTable;
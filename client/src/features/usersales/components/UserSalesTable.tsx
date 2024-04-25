import { Button } from '@/components/Button';
import { DataTable } from '@/components/Tables/DataTable';
import { Invoice, UserSales, User } from '../types';
import { ColumnDef } from '@tanstack/react-table';
import { FC } from 'react';
import { useUserSales } from '../context/UserSalesContext';
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
	openModal: (data: UserSales, action: string) => void;
}

export const UserSalesTable: FC<UserSalesTableProps> = ({ openModal }: UserSalesTableProps) =>{
	const { invoices, isFetching, users, userSales, setSelectedInvoice } = useUserSales();

	const handleInvoice = () => {
		openModal({} as UserSales, 'add');
	};

	const handleInvoiceDetails = (invoice: UserSales) => {
		setSelectedInvoice(invoice.invoices);
		openModal(invoice, 'details');
	};
	
	const UserSalesTableHeader: ColumnDef<UserSales>[] = [
		{
			accessorKey: 'issued_by',
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
					{row.original.invoices[0].issued_by.firstname + 
						" " + row.original.invoices[0].issued_by.lastname}
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
							NUMBER OF SALES {column.getIsSorted() === "asc" ? <ArrowUp /> : 
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
							TOTAL AMOUNT OF SALES {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				)
			},
			cell: ({ row }) => {
				const initial = row.original.invoices.filter((invoice) => invoice.status === "approved");

				const total = initial.reduce(
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
				data={userSales}
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
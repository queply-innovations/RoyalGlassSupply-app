import { Button } from '@/components/Button';
import { DataTable } from '@/components/Tables/DataTable';
import {
	Inventory,
	InventoryDatabase,
	InventoryProduct,
	InventoryProductDatabase,
} from '../../types';
import { ColumnDef } from '@tanstack/react-table';
import { FC, useEffect, useState } from 'react';
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
import { useExpenses } from '../../context';
import { Invoice, InvoiceDate } from '../../types';
import { set } from 'date-fns';

interface ExpensesTableProps {
	openModal: (data: Invoice[], action: string) => void;
}

export const ExpensesTable: FC<ExpensesTableProps> = ({ openModal }: ExpensesTableProps) =>{
	const { invoices,
		isFetching,
		selectedInventory,
		setSelectedInventory,
		selectedInvoice,
		setSelectedInvoice } = useExpenses();

	const [ invoiceDates, setInvoiceDates ] = useState<string[]>([]);
	const [ invoiceData, setInvoiceData ] = useState<InvoiceDate[]>([]);

	// const handleInvoice = () => {
	// 	openModal({} as UserSales, 'add');
	// };

	const handleInvoiceDetails = (invoice: Invoice[]) => {
		setSelectedInvoice(invoice);
		openModal(invoice, 'details');
	};

	invoices.map((invoice) => {
		// const invoicePerDate = invoice.created_at.split("T")[0];
		const details = { 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric' };
		const format = new Date(invoice.created_at).toLocaleDateString([], details);
		// console.log(invoicePerDate);
		if (!invoiceDates.includes(format)) {
			setInvoiceDates([...invoiceDates, format]);
		}
	});

	useEffect(() => {
		// console.log(invoiceDates);
		invoiceDates.map((date) => {
			const details = { 
				year: 'numeric', 
				month: 'long', 
				day: 'numeric' };
			const filteringByDate = invoices.filter((invoice) => date === new Date(invoice.created_at).toLocaleDateString([], details));
			setInvoiceData(prev => [...prev, {
				date: date,
				invoices: filteringByDate
			}]);
		});
	}, [invoiceDates]);

	useEffect(() => {
		invoiceData.sort((a,b) => (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0));
	}, [invoiceData]);
	
	const ExpensesTableHeader: ColumnDef<InvoiceDate>[] = [
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
			accessorKey: 'date',
			sortingFn: "datetime",
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
							DATE {column.getIsSorted() === "asc" ? <ArrowUp /> : 
										column.getIsSorted() === "desc" ? <ArrowDown /> : <ArrowUpDown />}
						</Button>
					</div>
				)
			},
			cell: ({ row }) => {
				const sched: any = row.getValue('date');
				if (sched.toString() !== '0000-00-00') {
					const details = { 
						year: 'numeric', 
						month: 'long', 
						day: 'numeric' };
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
			id: 'expenses',
			header:	({ column }) => {
				return ( <div className="text-center"> TOTAL AMOUNT OF EXPENSES </div> );
			},
			cell: ({ row }) => {
				const initial = row.original.invoices.filter((invoice) => invoice.status === "approved");

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
				const invoicesRow = row.original.invoices;
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
									onClick={() => handleInvoiceDetails(invoicesRow)}
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
				data={invoiceData}
				columns={ExpensesTableHeader}
				filterWhat={""}
				hideFilter={true}
				dataType={""}
				openModal={undefined}
				isLoading={isFetching} />
		</>
	);
};

export default ExpensesTable;
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

	console.log(invoices);

	useEffect(() => {
		invoices.map((invoice) => {
			const invoicePerDate = invoice.created_at.split("T")[0];
			if (!invoiceDates.includes(invoicePerDate)) {
				setInvoiceDates([...invoiceDates, invoicePerDate]);
			}
		});
	}, [invoices]);

	useEffect(() => {
		console.log(invoiceDates);
	}, [invoiceDates]);
	
	const ExpensesTableHeader: ColumnDef<Invoice>[] = [
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

	];

	return (
		<>
			<DataTable
				data={invoices}
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
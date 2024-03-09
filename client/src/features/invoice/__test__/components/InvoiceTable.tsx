import { DataTable } from '@/components/Tables/DataTable';
import { Invoices } from '../types';
import { useInvoice } from '../context/InvoiceContext';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components';
import { FaPencilAlt } from 'react-icons/fa';

interface InvoiceTableProps {
	modalHandler: (data: Invoices, action: string) => void;
}

export const InvoiceTable = ({ modalHandler }: InvoiceTableProps) => {
	const { invoices, setInvoiceSelected } = useInvoice();

	/**
	 * Handles the invoice action.
	 * @param data - The invoice data.
	 * @param action - The action to perform ('update' or 'remove').
	 */
	const handleInvoice = (data: Invoices, action: string) => {
		if (action === 'update') {
			setInvoiceSelected(data);
			modalHandler(data, 'update');
		} else if (action === 'remove') {
			setInvoiceSelected(data);
			modalHandler(data, 'remove');
		} else {
			modalHandler(data, 'add');
			console.log('add');
		}
	};
	console.log('invoices:', invoices);
	const TableHeader: ColumnDef<Invoices>[] = [
		{
			id: 'select',
			header: ({ table }) => (
				<input
					type="checkbox"
					checked={table.getIsAllPageRowsSelected()}
					onChange={e =>
						table.toggleAllPageRowsSelected(!!e.target.checked)
					}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<input
					type="checkbox"
					checked={row.getIsSelected()}
					onChange={e => row.toggleSelected(!!e.target.checked)}
					aria-label="Select row"
					className="justify-center"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: 'id',
			header: () => <div className="justify-center">Invoice ID</div>,
		},
		{
			id: 'or_no',
			accessorKey: 'or_no',
			header: () => <div className="justify-center">OR #</div>,
		},
		{
			accessorKey: 'reference_no',
			header: () => <div className="justify-center">Reference #</div>,
			cell: ({ row }) => {
				const invoiceRow = row.original;

				return (
					<>
						{invoiceRow.reference_no === null
							? 'N/A'
							: invoiceRow.reference_no}
					</>
				);
			},
		},
		{
			accessorKey: 'subtotal',
			header: () => <div className="justify-center">Sub Total Price</div>,
		},
		{
			accessorKey: 'total_amount_due',
			header: () => <div className="justify-center">Amount Due</div>,
		},
		{
			id: 'actions',
			header: () => (
				<div className="flex flex-row justify-center">ACTIONS</div>
			),
			cell: ({ row }) => {
				const invoiceRow = row.original;
				return (
					<div className="flex flex-row justify-center text-xs font-normal uppercase">
						<Button
							fill="empty"
							textColor={'black'}
							onClick={() => handleInvoice(invoiceRow, 'update')}
							className="flex flex-row items-center gap-2"
						>
							<FaPencilAlt /> Edit
						</Button>
						<Button
							fill={'red'}
							onClick={() => handleInvoice(invoiceRow, 'remove')}
						>
							Remove
						</Button>
					</div>
				);
			},
		},
	];

	return (
		<>
			<DataTable
				data={invoices}
				filterWhat={'or_no'}
				columns={TableHeader}
				dataType={'Invoice'}
				openModal={() => handleInvoice}
			/>
		</>
	);
};

import { Button } from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import { Invoices } from '../types';
import { FaPencilAlt } from 'react-icons/fa';

interface InvoiceTableHeaderProps {
	openModal: (data: Invoices, action: string) => void;
}

export const InvoiceTableHeader = ({ openModal }: InvoiceTableHeaderProps) => {
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
			accessorKey: 'or_no',
			header: () => <div className="justify-center">OR #</div>,
		},
		{
			accessorKey: 'reference_no',
			header: () => <div className="justify-center">Reference #</div>,
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
				const warehouseRow = row.original;
				return (
					<div className="flex flex-row justify-center text-xs font-normal uppercase">
						<Button
							fill="empty"
							textColor={'black'}
							onClick={() => openModal(warehouseRow, 'edit')}
							className="flex flex-row items-center gap-2"
						>
							<FaPencilAlt /> Edit
						</Button>
						<Button
							fill={'red'}
							onClick={() => openModal(warehouseRow, 'remove')}
						>
							Remove
						</Button>
					</div>
				);
			},
		},
	];
	return { TableHeader };
};

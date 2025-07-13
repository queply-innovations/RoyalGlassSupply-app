import { ColumnDef } from '@tanstack/react-table';
import { PrintTable } from './PrintTable';
import { Invoices } from '@/features/invoice/__test__/types';
import { useAuth } from '@/context/AuthContext';
import { CartItem } from '../../types';

interface InvoiceTableProps {
	invoiceItems: CartItem[];
	invoiceDetails: Invoices;
}

export const InvoiceTable = ({
	invoiceItems,
	invoiceDetails,
}: InvoiceTableProps) => {
	function formatCurrency(value: number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'PHP',
		}).format(value);
	}

	const InvoiceTableHeader: ColumnDef<CartItem>[] = [
		{
			size: 50,
			accessorKey: 'quantity',
			header: () => <div className="text-xs font-bold">QTY</div>,
			cell: ({ row }) => {
				return <span className="text-xs">{row.original.quantity}</span>;
			},
		},
		{
			size: 800,
			accessorKey: 'name',
			header: () => <div className="text-xs font-bold">Item</div>,
			cell: ({ row }) => {
				return (
					<div className="flex flex-row gap-2">
						<span className="text-xs font-bold">
							{row.original.item.product.name}
						</span>
						{row.original.item.product.brand ? (
							<span className="text-xs">
								({row.original.item.product.brand})
							</span>
						) : null}
						<span className="text-xs">
							{row.original.item.product.size}
						</span>
						<span className="text-xs">
							{row.original.item.product.color}
						</span>
					</div>
				);
			},
		},
		{
			size: 170,
			accessorKey: 'price',
			header: () => <div className="text-xs font-bold">Price</div>,
			cell: ({ row }) => {
				return (
					<div className="flex flex-row gap-2">
						<span className="text-xs">
							{formatCurrency(row.original.product_price)}
						</span>
					</div>
				);
			},
		},
		{
			size: 170,
			id: 'total_price',
			accessorKey: 'total_price',
			header: () => <div className="text-xs font-bold">Subtotal</div>,
			cell: ({ row }) => {
				return (
					<div className="text-xs">
						<span>{formatCurrency(row.original.total_price)}</span>
					</div>
				);
			},
		},
	];
	const { auth } = useAuth();
	return (
		<PrintTable
			user={auth.user}
			data={invoiceItems}
			columns={InvoiceTableHeader}
			invoice
			subtotal={invoiceDetails.subtotal}
			discount={
				invoiceDetails.total_discount > 0
					? invoiceDetails.total_discount
					: undefined
			}
			deliveryCharge={
				invoiceDetails.delivery_charge > 0
					? invoiceDetails.delivery_charge
					: undefined
			}
			totalDue={invoiceDetails.total_amount_due}
			amountPaid={
				invoiceDetails.paid_amount > 0
					? invoiceDetails.paid_amount
					: undefined
			}
			isBalancePayment={invoiceDetails.payment_method === 'balance_payment'}
		/>
	);
};

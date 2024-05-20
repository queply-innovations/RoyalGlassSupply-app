import { ColumnDef } from '@tanstack/react-table';
import { PrintTable } from './PrintTable';
import { InvoiceItems, Invoices } from '@/features/invoice/__test__/types';
import { useProductPricesQuery } from '@/features/product/__test__/hooks';
import { useAuth } from '@/context/AuthContext';

interface InvoiceTableProps {
	queue: any;
	itemsDatabase: any;
	fullData: Invoices;
}

export const InvoiceTable = ({
	queue,
	itemsDatabase,
	fullData,
}: InvoiceTableProps) => {
	const { data: productPrices } = useProductPricesQuery();
	function formatCurrency(value: number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'PHP',
		}).format(value);
	}

	const InvoiceTableHeader: ColumnDef<InvoiceItems>[] = [
		{
			size: 50,
			accessorKey: 'quantity',
			header: () => <div className="text-xs font-bold">QTY</div>,
			cell: ({ row }) => {
				const id = row.original.id;
				const itemDatabase = itemsDatabase.find(
					(item: any) => item.product_price_id === id,
				);
				return <span className="text-xs">{itemDatabase.quantity}</span>;
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
							{row.original.product.name}
						</span>
						{row.original.product.brand ? (
							<span className="text-xs">
								({row.original.product.brand})
							</span>
						) : null}
						<span className="text-xs">{row.original.product.size}</span>
						<span className="text-xs">{row.original.product.color}</span>
					</div>
				);
			},
		},
		// {
		//   size: 50,
		//   accessorKey: 'quantity',
		//   header: () => <div className="text-xs font-bold">QTY</div>,
		//   cell: ({ row }) => {
		//     const id = row.original.id;
		//     const itemDatabase = itemsDatabase.find(
		//       (item: any) => item.product_price_id === id,
		//     );
		//     return <span className="text-xs">{itemDatabase.quantity}</span>;
		//   },
		// },
		{
			size: 170,
			accessorKey: 'price',
			header: () => <div className="text-xs font-bold">Price</div>,
			cell: ({ row }) => {
				const id = row.original.id;
				const itemDatabase = itemsDatabase.find(
					(item: any) => item.product_price_id === id,
				);
				const productOnSale = productPrices.find(
					inventory => inventory.product.id === row.original.product.id,
				);
				return (
					<div className="flex flex-row gap-2">
						<span className="text-xs">
							{formatCurrency(itemDatabase.product_price)}
						</span>
						{productOnSale?.sale_discount ? (
							<span className="text-xs font-light">
								({formatCurrency(productOnSale?.sale_discount ?? 0)})
							</span>
						) : null}
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
				const id = row.original.id;
				const itemDatabase = itemsDatabase.find(
					(item: any) => item.product_price_id === id,
				);
				return (
					<div className="text-xs">
						<span>{formatCurrency(itemDatabase.total_price)}</span>
					</div>
				);
			},
		},
	];
	const { auth } = useAuth();
	return (
		<>
			{/* {invoiceItemsQueue.length === 0 ? (
				<TablePlacholder />
			) : ( */}
			<PrintTable
				user={auth.user}
				data={queue}
				columns={InvoiceTableHeader}
				invoice
				subtotal={fullData.subtotal}
				discount={
					fullData.total_discount > 0 ? fullData.total_discount : undefined
				}
				deliveryCharge={
					fullData.delivery_charge > 0
						? fullData.delivery_charge
						: undefined
				}
				totalDue={fullData.total_amount_due}
				amountPaid={
					fullData.paid_amount > 0 ? fullData.paid_amount : undefined
				}
				isBalancePayment={fullData.payment_method === 'balance_payment'}
			/>
			{/* )} */}
		</>
	);
};

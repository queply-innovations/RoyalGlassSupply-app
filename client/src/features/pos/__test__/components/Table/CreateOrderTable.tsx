import { ColumnDef } from '@tanstack/react-table';
import { PosTable } from './PosTable';
import { TablePlacholder } from './EmptyPlaceholder';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import {
	InvoiceItemDatabase,
	InvoiceItems,
	Invoices,
} from '@/features/invoice/__test__/types';
import { usePos } from '../../context/__test__/PosContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useInventoryProds } from '@/features/inventory/context';

interface CreateOrderTableProps {}

export const CreateOrderTable = ({}: CreateOrderTableProps) => {
	const { invoiceItemsQueue } = useInvoice();
	const { quantityHandler, productListing } = usePos();
	const { data: inventoryProducts } = useInventoryProds();

	const CreateOrderTableHeader: ColumnDef<InvoiceItemDatabase>[] = [
		{
			id: 'orderItem',
			enableResizing: false,
			header: () => {
				return <div className="flex justify-center">Item #</div>;
			},
			// <div className="flex justify-center">Item #</div>,
			cell: ({ row }) => {
				return <div className="flex justify-center">{row.index + 1}</div>;
			},
		},
		{
			accessorKey: 'name',
			header: () => <div className="justify-center">Product Name</div>,
			cell: ({ row }) => {
				return (
					<div className="flex justify-center">
						{row.original.product_id.name}
					</div>
				);
			},
		},
		{
			accessorKey: 'quantity',
			header: () => <div className="flex justify-center">Quantity</div>,
			cell: ({ row }) => {
				const productIndex = row.index;
				const remainingStocks = inventoryProducts.find(
					inventory => inventory.product.id === row.original.product_id.id,
				);

				return (
					<div className="flex justify-center ">
						<div className="flex flex-row border drop-shadow-sm">
							<Button
								className="rounded-sm bg-red-300 hover:bg-red-500"
								onClick={() => {
									quantityHandler(
										productIndex,
										row.original.quantity - 1,
										remainingStocks
											? remainingStocks.remaining_stocks_count ?? 0
											: 0,
									);
								}}
							>
								<span>-</span>
							</Button>
							<Input
								className="w-20 rounded-none text-center drop-shadow-none"
								type="number"
								value={row.original.quantity || ''}
								onChange={e => {
									quantityHandler(
										productIndex,
										Number(e.target.value),
										remainingStocks
											? remainingStocks.remaining_stocks_count ?? 0
											: 0,
									);
								}}
								disabled={
									remainingStocks
										? remainingStocks.remaining_stocks_count ?? 1 <= 1
											? true
											: false
										: false
								}
							/>
							<Button
								className="rounded-sm bg-slate-500 hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-200"
								onClick={() => {
									quantityHandler(
										productIndex,
										row.original.quantity + 1,
										remainingStocks
											? remainingStocks.remaining_stocks_count ?? 0
											: 0,
									);
								}}
								disabled={
									remainingStocks
										? remainingStocks.remaining_stocks_count ?? 1 <= 1
											? true
											: false
										: false
								}
							>
								<span>+</span>
							</Button>
						</div>
					</div>
				);
			},
		},
		{
			accessorKey: 'price',
			header: () => <div className="justify-center">Product Price</div>,
			cell: ({ row }) => (
				<div className="">
					<span>₱ {String(row.original.product_price)}</span>
				</div>
			),
		},
		{
			accessorKey: 'total_price',
			header: () => <div className="justify-center">Total</div>,
			cell: ({ row }) => (
				<div className="">
					<span>₱ {row.original.total_price}</span>
				</div>
			),
		},
	];
	return (
		<>
			{invoiceItemsQueue.length === 0 ? (
				<TablePlacholder />
			) : (
				<PosTable
					data={invoiceItemsQueue}
					columns={CreateOrderTableHeader}
				/>
			)}
		</>
	);
};

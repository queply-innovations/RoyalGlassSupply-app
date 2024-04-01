import { ColumnDef } from '@tanstack/react-table';
import { PosTable } from './PosTable';
import { TablePlacholder } from './EmptyPlaceholder';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import { InvoiceItemDatabase } from '@/features/invoice/__test__/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useInventoryProds } from '@/features/inventory/context';
import { Trash2Icon } from 'lucide-react';
import { useProductPrices } from '@/features/product/__test__';

interface CreateOrderTableProps {}

export const CreateOrderTable = ({}: CreateOrderTableProps) => {
	const {
		invoiceItemsQueue,
		quantityHandler,
		formatCurrency,
		handleInvoiceItemsChange,
		handleRemoveInvoiceItem,
	} = useInvoice();
	const { data: inventoryProducts } = useInventoryProds();
	const { data: productPrices } = useProductPrices();

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
			size: 250,
		},
		{
			accessorKey: 'name',
			header: () => <div className="justify-center">Product Name</div>,
			cell: ({ row }) => {
				return <div className="flex ">{row.original.product_id.name}</div>;
			},
		},
		{
			accessorKey: 'quantity',
			header: () => <div className="flex justify-center">Quantity</div>,
			cell: ({ row }) => {
				const productIndex = row.index;
				const productInfo = inventoryProducts.find(
					inventory => inventory.product.id === row.original.product_id.id,
				);
				// console.log(
				// 	'Remaining Stocks:',
				// 	productInfo?.remaining_stocks_count,
				// 	'FOR:',
				// 	row.original.product_id.id,
				// 	'Product Name:',
				// 	row.original.product_id.name,
				// );

				return (
					<div className="flex justify-center ">
						<div className="flex flex-row border drop-shadow-sm">
							<Button
								className="rounded-sm bg-red-300 hover:bg-red-500 disabled:opacity-100"
								onClick={() => {
									quantityHandler(
										productIndex,
										row.original.quantity - 1,
										productInfo?.remaining_stocks_count ?? 0,
									);
								}}
								disabled={row.original.quantity <= 1 ? true : false}
							>
								<span>-</span>
							</Button>
							<Input
								id="quantity"
								className="w-20 rounded-none text-center drop-shadow-none"
								type="number"
								value={row.original.quantity || ''}
								onChange={e => {
									//TODO - rerenders after input loses focus
									quantityHandler(
										productIndex,
										Number(e.target.value),
										productInfo
											? productInfo.remaining_stocks_count ?? 0
											: 0,
									);
								}}
								disabled={
									productInfo?.remaining_stocks_count ? false : true
								}
							/>
							<Button
								className="rounded-sm bg-slate-500 hover:bg-slate-700 disabled:bg-slate-200"
								onClick={() => {
									quantityHandler(
										productIndex,
										row.original.quantity + 1,
										productInfo?.remaining_stocks_count ?? 0,
									);
								}}
								disabled={
									row.original.quantity >=
									(productInfo?.remaining_stocks_count ?? 0)
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
			cell: ({ row }) => {
				const productOnSale = productPrices.find(
					inventory => inventory.product.id === row.original.product_id.id,
				);
				return (
					<div className="flex flex-row gap-2">
						<span>{formatCurrency(row.original.product_price)}</span>
						{productOnSale?.sale_discount ? (
							<span className="text-sm font-light">
								({formatCurrency(productOnSale?.sale_discount ?? 0)})
							</span>
						) : null}
					</div>
				);
			},
		},
		{
			accessorKey: 'item_discount',
			header: () => <div className="justify-center">Item Discount</div>,
			cell: ({ row }) => {
				return (
					<div key={row.index}>
						<Input
							id="item_discount"
							value={row.original.item_discount}
							type="number"
							onChange={e => {
								//TODO - Fix this part, rerenders when adding input loses out of focus after input
								handleInvoiceItemsChange(
									row.index,
									'item_discount',
									Number(e.target.value),
								);
							}}
						/>
					</div>
				);
			},
		},
		{
			id: 'total_price',
			accessorKey: 'total_price',
			header: () => <div className="justify-center">Total</div>,
			cell: ({ row }) => (
				<div className="">
					<span>{formatCurrency(row.original.total_price)}</span>
				</div>
			),
			size: 250,
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				const invoiceIndex = row.index;
				return (
					<div className="flex flex-row justify-center text-xs font-normal uppercase">
						<Button
							className="bg-red-500 hover:bg-red-700"
							onClick={() => {
								handleRemoveInvoiceItem(invoiceIndex);
							}}
						>
							<Trash2Icon color="#FFF" />
						</Button>
					</div>
				);
			},
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

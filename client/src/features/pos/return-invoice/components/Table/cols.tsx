import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InvoiceItems } from '@/features/invoice/__test__/types';
import { formatCurrency } from '@/utils/FormatCurrency';
import { ColumnDef } from '@tanstack/react-table';
import { useReturnInvoice } from '../../context/ReturnInvoiceContext';
import { Trash2Icon } from 'lucide-react';

export const ReturnCols = () => {
	return <></>;
};

export const ReturnTableColumns = () => {
	const { returnInvoice, updateQuantity, isSubmitting, removeReturnItem } =
		useReturnInvoice();

	const cols: ColumnDef<InvoiceItems>[] = [
		{
			id: 'itemNumber',
			accessorKey: 'id',
			header: () => {
				return <div className="flex justify-center">Item #</div>;
			},
			cell: ({ row }) => {
				return <div className="flex justify-center">{row.index + 1}</div>;
			},
			size: 100,
		},
		{
			accessorKey: 'quantityPurchased',
			header: () => <div className="flex justify-center">QTY Purchased</div>,
			size: 50,
			cell: ({ row }) => {
				return <div className="flex ">{row.original.quantity}</div>;
			},
		},
		{
			accessorKey: 'quantityReturn',
			header: () => <div className="flex justify-center">QTY To Return</div>,
			size: 100,
			cell: ({ row }) => {
				return (
					<div className="flex w-full flex-row justify-center ">
						<Button
							className="rounded-sm bg-red-300 hover:bg-red-500 disabled:opacity-100"
							onClick={() => {
								updateQuantity(
									row.original.id,
									(returnInvoice.return_items.find(
										item => item.invoice_item_id === row.original.id,
									)?.quantity ?? 1) - 1,
								);
							}}
							disabled={
								(returnInvoice.return_items.find(
									item => item.invoice_item_id === row.original.id,
								)?.quantity ?? 1) === 1 || isSubmitting
							}
						>
							<span>-</span>
						</Button>
						<Input
							type="number"
							min={1}
							className="max-w-[100px]"
							readOnly
							value={
								returnInvoice.return_items.find(
									item => item.invoice_item_id === row.original.id,
								)?.quantity ?? 1
							}
						/>
						<Button
							className="rounded-sm bg-slate-500 hover:bg-slate-700 disabled:bg-slate-200"
							onClick={() => {
								updateQuantity(
									row.original.id,
									(returnInvoice.return_items.find(
										item => item.invoice_item_id === row.original.id,
									)?.quantity ?? 1) + 1,
								);
							}}
							disabled={
								row.original.quantity ===
									(returnInvoice.return_items.find(
										item => item.invoice_item_id === row.original.id,
									)?.quantity ?? 1) || isSubmitting
							}
						>
							<span>+</span>
						</Button>
					</div>
				);
			},
		},
		{
			accessorKey: 'product.name',
			size: 100,
			header: () => <div className="justify-center">Product</div>,
			cell: ({ row }) => {
				return (
					<div className="flex flex-col">
						<div className="flex flex-row items-center gap-2">
							{row.original.product.brand && (
								<span className="text-xs font-light">
									({row.original.product.brand})
								</span>
							)}
							<span className="text-xs font-bold">
								{row.original.product.name}
							</span>
							•
							<span className="text-xs font-medium capitalize">
								{row.original.product.size}
							</span>
							•
							<span className="text-xs font-bold uppercase">
								{row.original.product.color}
							</span>
						</div>
					</div>
				);
			},
		},
		{
			accessorKey: 'product_price',
			size: 100,
			header: () => <div className="justify-center">Price</div>,
			cell: ({ row }) => {
				return (
					<div className="flex flex-col">
						<div className="flex flex-row gap-2">
							<span className="text-xs font-bold">
								{
									// @ts-expect-error 'price' does not exist on type 'InvoiceItems'
									formatCurrency(row.original.product_price.price ?? 0)
								}
							</span>
						</div>
					</div>
				);
			},
		},
		{
			id: 'actions',
			size: 100,
			cell: ({ row }) => {
				return (
					<div className="flex flex-row justify-center text-xs font-normal uppercase">
						<Button
							className="bg-red-500 hover:bg-red-700"
							onClick={() => {
								removeReturnItem(row.original.id);
							}}
						>
							<Trash2Icon color="#FFF" />
						</Button>
					</div>
				);
			},
		},
	];

	return cols;
};

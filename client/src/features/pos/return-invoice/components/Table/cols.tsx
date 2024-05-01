import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InvoiceItems } from '@/features/invoice/__test__/types';
import { formatCurrency } from '@/utils/FormatCurrency';
import { ColumnDef } from '@tanstack/react-table';
import { useReturnInvoice } from '../../context/ReturnInvoiceContext';
// import { useDebounce } from "@uidotdev/usehooks";

export const ReturnCols = () => {
	return <></>;
};

export const ReturnTableColumns = () => {
	const { returnInvoice, updateQuantity } = useReturnInvoice();

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
								)?.quantity ?? 1) === 1
							}
						>
							<span>-</span>
						</Button>
						<Input
							type="number"
							min={1}
							// max={row.original.quantity}
							className="max-w-[100px]"
							// defaultValue={1}
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
								)?.quantity ?? 1)
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
								<span className="text-sm font-light">
									({row.original.product.brand})
								</span>
							)}
							<span className="text-sm font-bold">
								{row.original.product.name}
							</span>
							•
							<span className="text-sm font-medium capitalize">
								{row.original.product.size}
							</span>
							•
							<span className="text-sm font-bold uppercase">
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
				// const debouncedQuantity = useDebounce()
				return (
					<div className="flex flex-col">
						<div className="flex flex-row gap-2">
							<span className="text-sm font-bold">
								{formatCurrency(row.original.product_price)}
							</span>
						</div>
					</div>
				);
			},
		},
	];

	return cols;
};

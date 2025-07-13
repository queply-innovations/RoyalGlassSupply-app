import { ColumnDef } from '@tanstack/react-table';
import { ReturnItems } from '../../types';

export const ReturnItemsCols = () => {
	const columns: ColumnDef<ReturnItems>[] = [
		{
			id: 'product',
			accessorKey: 'invoice_item.product.name',
			header: () => <div className="justify-center uppercase">Product</div>,
			cell: ({ row }) => {
				return (
					<div className="flex flex-row gap-2 ">
						{row.original.invoice_item.product.brand ? (
							<>
								<span>({row.original.invoice_item.product.brand})</span>
							</>
						) : null}
						<span className="font-bold">
							{row.original.invoice_item.product.name}
						</span>
						<span className="">
							{row.original.invoice_item.product.size}
						</span>
						<span className="">
							{row.original.invoice_item.product.color}
						</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'unit',
			header: () => <div className="justify-center uppercase">Unit</div>,
		},
		{
			accessorKey: 'quantity',
			header: () => <div className="justify-center uppercase">QTY</div>,
		},
		{
			accessorKey: 'capital_price',
			header: () => <div className="justify-center uppercase">Capital</div>,
			cell: ({ row }) => {
				return (
					<div className="uppercase">
						<span className="max-w-[25ch] truncate">
							{Intl.NumberFormat('en-PH', {
								style: 'currency',
								currency: 'PHP',
							}).format(
								//@ts-expect-error 'type not updated'
								row.original.invoice_item.product_price.capital_price ??
									0,
							)}
						</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'price',
			header: () => <div className="justify-center uppercase">Price</div>,
			cell: ({ row }) => {
				return (
					<div className="uppercase">
						<span className="max-w-[25ch] truncate">
							{Intl.NumberFormat('en-PH', {
								style: 'currency',
								currency: 'PHP',
							}).format(row.original.price)}
						</span>
					</div>
				);
			},
		},
		{
			id: 'subtotal',
			header: () => <div className="justify-center uppercase">Subtotal</div>,
			cell: ({ row }) => {
				return (
					<div className="uppercase">
						<span className="max-w-[25ch] truncate">
							{Intl.NumberFormat('en-PH', {
								style: 'currency',
								currency: 'PHP',
							}).format(
								(row.original.price ?? 0) *
									(row.original.quantity ?? 0),
							)}
						</span>
					</div>
				);
			},
		},
	];

	return columns;
};

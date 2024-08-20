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
					<div>
						<span className="max-w-[20ch] truncate">
							{row.original.invoice_item.product.name}
						</span>
					</div>
				);
			},
		},
		{
			accessorKey: 'invoice_item.product.brand',
			header: () => <div className="justify-center uppercase">Brand</div>,
		},
		{
			accessorKey: 'invoice_item.product.size',
			header: () => <div className="justify-center uppercase">Size</div>,
		},
		{
			accessorKey: 'invoice_item.product.color',
			header: () => <div className="justify-center uppercase">Color</div>,
		},
		{
			accessorKey: 'invoice_item.product.serial_no',
			header: () => <div className="justify-center uppercase">Serial</div>,
		},
		{
			accessorKey: 'quantity',
			header: () => <div className="justify-center uppercase">QTY</div>,
		},
		{
			accessorKey: 'unit',
			header: () => <div className="justify-center uppercase">Unit</div>,
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

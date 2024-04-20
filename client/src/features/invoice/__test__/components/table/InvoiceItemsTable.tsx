import { ColumnDef } from '@tanstack/react-table';
import { InvoiceItemDatabase, InvoiceItems } from '../../types';
import { PosTable } from '@/features/pos/__test__/components/Table/PosTable';

interface InvoiceItemsTableProps {
	items: InvoiceItemDatabase[];
}

export const InvoiceItemsTable = ({ items }: InvoiceItemsTableProps) => {
	const colums: ColumnDef<InvoiceItemDatabase>[] = [
		{
			id: 'orderItem',
			enableResizing: false,
			header: () => {
				return <div className="flex ">Item #</div>;
			},
			cell: ({ row }) => {
				return (
					<div className="flex ">
						({row.original.product.brand}) {row.original.product.name}
					</div>
				);
			},
			size: 200,
		},
		{
			id: 'quantity',
			enableResizing: false,
			header: () => {
				return <div className="flex ">Quantity</div>;
			},
			cell: ({ row }) => {
				return <div className="flex ">{row.original.quantity}</div>;
			},
		},
		{
			id: 'price',
			enableResizing: false,
			header: () => {
				return <div className="flex ">Price</div>;
			},
			cell: ({ row }) => {
				return <div className="flex ">{row.original.product_price}</div>;
			},
		},
	];
	return (
		<>
			<PosTable columns={colums} data={items} />
		</>
	);
};

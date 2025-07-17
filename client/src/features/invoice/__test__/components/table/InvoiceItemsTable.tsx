import { ColumnDef } from '@tanstack/react-table';
import { InvoiceItemDatabase } from '../../types';
import { DataTable } from '@/components/Tables/DataTable';

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
					<div className="flex flex-row gap-2 ">
						{row.original.product.brand ? (
							<>
								<span>({row.original.product.brand})</span>
							</>
						) : null}
						<span className="font-bold">{row.original.product.name}</span>
						<span className="">{row.original.product.size}</span>
						<span className="">{row.original.product.color}</span>
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
			id: 'capital_price',
			enableResizing: false,
			header: () => {
				return <div className="flex ">Capital</div>;
			},
			cell: ({ row }) => {
				return (
					<div className="flex ">
						{Intl.NumberFormat('en-PH', {
							style: 'currency',
							currency: 'PHP',
							//@ts-expect-error 'type not updated'
						}).format(row.original.product_price.capital_price ?? 0)}
					</div>
				);
			},
		},
		{
			id: 'price',
			enableResizing: false,
			header: () => {
				return <div className="flex ">Price</div>;
			},
			cell: ({ row }) => {
				return (
					<div className="flex ">
						{Intl.NumberFormat('en-PH', {
							style: 'currency',
							currency: 'PHP',
							//@ts-expect-error 'type not updated'
						}).format(row.original.sold_price ?? 0)}
					</div>
				);
			},
		},
		{
			id: 'subtotal',
			enableResizing: false,
			header: () => {
				return <div className="flex ">Subtotal</div>;
			},
			cell: ({ row }) => {
				return (
					<div className="flex ">
						{Intl.NumberFormat('en-PH', {
							style: 'currency',
							currency: 'PHP',
						}).format(row.original.total_price ?? 0)}
					</div>
				);
			},
		},
	];
	return (
		<>
			<DataTable
				columns={colums}
				data={items}
				dataType="orderItem"
				filterWhat="price"
				hideFilter
			/>
		</>
	);
};

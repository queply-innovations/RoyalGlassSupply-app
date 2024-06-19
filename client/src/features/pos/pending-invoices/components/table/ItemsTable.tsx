import { DataTable } from '@/components/Tables/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components';

interface PendingInvoicesItemsTableProps {
	invoiceItems: any;
}

export const PendingInvoicesItemsTable = ({
	invoiceItems,
}: PendingInvoicesItemsTableProps) => {
	const InventoryItemHeader: ColumnDef<any>[] = [
		{
			accessorKey: 'product_name',
			sortingFn: 'alphanumeric',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="mx-auto flex flex-row items-center bg-transparent text-black"
						>
							PRODUCT NAME{' '}
							{column.getIsSorted() === 'asc' ? (
								<ArrowUp />
							) : column.getIsSorted() === 'desc' ? (
								<ArrowDown />
							) : (
								<ArrowUpDown />
							)}
						</Button>
					</div>
				);
			},
			cell: ({ row }) => (
				<div className="text-center">
					{row.original.product
						? `${row.original.product.name} ${row.original.product.brand} ${row.original.product.size}`
						: 'N/A'}
				</div>
			),
		},
		{
			accessorKey: 'capital_price',
			sortingFn: 'alphanumeric',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="mx-auto flex flex-row items-center bg-transparent text-black"
						>
							CAPITAL PRICE{' '}
							{column.getIsSorted() === 'asc' ? (
								<ArrowUp />
							) : column.getIsSorted() === 'desc' ? (
								<ArrowDown />
							) : (
								<ArrowUpDown />
							)}
						</Button>
					</div>
				);
			},
			cell: ({ row }) => (
				<div className="text-center">
					{Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: 'PHP',
					}).format(row.original.inventory_product.capital_price)}
				</div>
			),
		},
		{
			accessorKey: 'selling_price',
			sortingFn: 'alphanumeric',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="mx-auto flex flex-row items-center bg-transparent text-black"
						>
							SELLING PRICE{' '}
							{column.getIsSorted() === 'asc' ? (
								<ArrowUp />
							) : column.getIsSorted() === 'desc' ? (
								<ArrowDown />
							) : (
								<ArrowUpDown />
							)}
						</Button>
					</div>
				);
			},
			cell: ({ row }) => (
				<div className="text-center">
					{Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: 'PHP',
					}).format(row.original.inventory_product.product_price.price)}
				</div>
			),
		},
		{
			accessorKey: 'quantity',
			sortingFn: 'alphanumeric',
			enableSorting: true,
			header: ({ column }) => {
				return (
					<div>
						<Button
							onClick={() =>
								column.toggleSorting(column.getIsSorted() === 'asc')
							}
							className="mx-auto flex flex-row items-center bg-transparent text-black"
						>
							QUANTITY{' '}
							{column.getIsSorted() === 'asc' ? (
								<ArrowUp />
							) : column.getIsSorted() === 'desc' ? (
								<ArrowDown />
							) : (
								<ArrowUpDown />
							)}
						</Button>
					</div>
				);
			},
			cell: ({ row }) => (
				<div className="text-center">{row.original.quantity}</div>
			),
		},
	];

	return (
		<DataTable
			//@ts-ignore
			data={invoiceItems || []}
			columns={InventoryItemHeader}
			filterWhat={''}
			hideFilter={true}
			dataType={''}
			openModal={undefined}
		/>
	);
};

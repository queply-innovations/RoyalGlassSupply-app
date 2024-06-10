import { Invoices } from '@/features/invoice/__test__/types';
import { formatUTCDate } from '@/utils/timeUtils';
import { DataTable } from '@/components/Tables/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Invoice } from '@/features/usersales/types';
import { Button } from '@/components';

import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

const PendingInvoiceDetails = ({
	selectedInvoice,
}: {
	selectedInvoice: Invoices;
}) => {
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
		<>
			<div className="flex max-w-4xl flex-col gap-4">
				<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-4">
					<div className="col-span-6 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Invoice Code</h3>
						<p className="text-sm text-gray-800">
							{selectedInvoice.code ? selectedInvoice.code : 'N/A'}
						</p>
					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-200" />
				<div className="grid w-full grid-flow-row grid-cols-6 gap-4">
					<div className="relative col-span-6 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold">Inventory Items</h3>

						<DataTable
							//@ts-ignore
							data={selectedInvoice?.invoice_items || []}
							columns={InventoryItemHeader}
							filterWhat={''}
							hideFilter={true}
							dataType={''}
							openModal={undefined}
						/>
					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-200" />
				<div className="grid w-full grid-flow-row grid-cols-6 gap-4">
					<div className="relative col-span-3 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold">Sub Total</h3>
						<p className="text-sm text-gray-800">
							{Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'PHP',
							}).format(selectedInvoice.subtotal)}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold">Total Amount Due</h3>
						<p className="text-sm text-gray-800">
							{Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'PHP',
							}).format(selectedInvoice.total_amount_due)}
						</p>
					</div>
					<div className="col-span-3 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold">Paid Amount</h3>
						<p className="text-sm text-gray-800">
							{Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'PHP',
							}).format(selectedInvoice.paid_amount)}
						</p>
					</div>
					<div className="relative col-span-3 flex flex-col justify-center	gap-1">
						<h3 className="text-sm font-bold">Total Discount</h3>
						<p className="text-sm text-gray-800">
							{Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'PHP',
							}).format(selectedInvoice.total_discount)}
						</p>
					</div>
				</div>
				<hr className="my-2 h-px w-full border-0 bg-gray-200" />
				<div className="grid w-full grid-flow-row grid-cols-12 gap-4">
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Issued by</h3>
						<p className="text-sm text-gray-800">{`${
							//@ts-ignore
							selectedInvoice.issued_by.firstname
						} ${
							//@ts-ignore
							selectedInvoice.issued_by.lastname
						}`}</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Created at</h3>
						<p className="text-sm text-gray-800">
							{formatUTCDate(selectedInvoice.created_at)}
							se
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Approval status</h3>
						<p className="text-sm text-gray-800">Pending</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default PendingInvoiceDetails;

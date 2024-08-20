import { useReturnItemsQuery } from '@/features/returns/hooks/useReturnItemsQuery';
import { ReturnTransactionsRaw } from '../../types';
import { DataTable } from '@/components/Tables/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { ReturnItems } from '@/features/returns/types';

interface ReturnItemsProps {
	selectedReturn: ReturnTransactionsRaw;
}

export const ReturnItemsTable = ({ selectedReturn }: ReturnItemsProps) => {
	const { data, isFetching } = useReturnItemsQuery(selectedReturn.id);
	const totalCapital = data?.reduce(
		(acc, item) =>
			acc +
			// @ts-expect-error 'type not updated'
			item.quantity * (item.invoice_item.product_price.capital_price ?? 0),
		0,
	);

	// console.log(data);

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
	];

	return (
		<>
			<div className="overflow-clip rounded-lg border bg-white">
				<DataTable
					data={data || []}
					columns={columns}
					isLoading={isFetching}
					dataType="Return Items"
					filterWhat="product"
					hideFilter
				/>
			</div>

			<div className="mt-4 grid w-full grid-cols-3 gap-4 text-sm">
				<div className="flex flex-row gap-2">
					<p className="font-bold">Total amount due:</p>
					<span>
						{Intl.NumberFormat('en-PH', {
							style: 'currency',
							currency: 'PHP',
						}).format(selectedReturn.invoice.total_amount_due)}
					</span>
				</div>

				<div className="flex flex-row gap-2">
					<p className="font-bold">Total capital (returns):</p>
					<span>
						{Intl.NumberFormat('en-PH', {
							style: 'currency',
							currency: 'PHP',
						}).format(totalCapital || 0)}
					</span>
				</div>

				<div className="flex flex-row gap-2">
					<p className="font-bold">Refundable amount:</p>
					<span>
						{Intl.NumberFormat('en-PH', {
							style: 'currency',
							currency: 'PHP',
						}).format(selectedReturn.refundable_amount)}
					</span>
				</div>
			</div>
		</>
	);
};

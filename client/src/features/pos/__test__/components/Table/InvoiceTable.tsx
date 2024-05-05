import { ColumnDef } from '@tanstack/react-table';
import { PosTable } from './PosTable';
import { TablePlacholder } from './EmptyPlaceholder';
import { useInvoice } from '@/features/invoice/__test__/context/InvoiceContext';
import {
	InvoiceItemDatabase,
	InvoiceItems,
} from '@/features/invoice/__test__/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useInventoryProds } from '@/features/inventory/context';
import { Trash2Icon } from 'lucide-react';
import { useProductPrices } from '@/features/product/__test__';
import { useInvoiceMutation } from '@/features/invoice/__test__/hooks/useInvoiceMutation';
import { useProductPricesQuery } from '@/features/product/__test__/hooks';

interface InvoiceTableProps {
	queue: any;
	itemsDatabase: any;
}

export const InvoiceTable = ({ queue, itemsDatabase }: InvoiceTableProps) => {
	const { data: productPrices, isLoading } = useProductPricesQuery();
	function formatCurrency(value: number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'PHP',
		}).format(value);
	}

	const InvoiceTableHeader: ColumnDef<InvoiceItems>[] = [
		{
			size: 50,
			accessorKey: 'quantity',
			header: () => (
				<div className="flex max-w-[50px] justify-center text-sm">
					Quantity
				</div>
			),
			cell: ({ row }) => {
				const id = row.original.id;
				const itemDatabase = itemsDatabase.find(
					(item: any) => item.product_price_id === id,
				);
				return (
					<div className="flex max-w-[50px] justify-center">
						<div className="flex flex-row text-xs">
							{itemDatabase.quantity}
						</div>
					</div>
				);
			},
		},
		{
			size: 800,
			accessorKey: 'name',
			header: () => (
				<div className="justify-center text-sm">Product Name</div>
			),
			cell: ({ row }) => {
				return (
					<div className="flex flex-row gap-2">
						<span className="text-xs font-bold">
							{row.original.product.name}
						</span>
						{row.original.product.brand ? (
							<span className="text-xs">
								({row.original.product.brand})
							</span>
						) : null}
						<span className="text-xs">{row.original.product.size}</span>
						<span className="text-xs">{row.original.product.color}</span>
					</div>
				);
			},
		},
		{
			size: 250,
			accessorKey: 'price',
			header: () => <div className="justify-center text-sm">Unit Cost</div>,
			cell: ({ row }) => {
				const id = row.original.id;
				const itemDatabase = itemsDatabase.find(
					(item: any) => item.product_price_id === id,
				);
				const productOnSale = productPrices.find(
					inventory => inventory.product.id === row.original.product.id,
				);
				return (
					<div className="flex flex-row gap-2">
						<span className="text-xs">
							{formatCurrency(itemDatabase.product_price)}
						</span>
						{productOnSale?.sale_discount ? (
							<span className="text-xs font-light">
								({formatCurrency(productOnSale?.sale_discount ?? 0)})
							</span>
						) : null}
					</div>
				);
			},
		},
		{
			size: 250,
			id: 'total_price',
			accessorKey: 'total_price',
			header: () => <div className="justify-center text-sm">Subtotal</div>,
			cell: ({ row }) => {
				const id = row.original.id;
				const itemDatabase = itemsDatabase.find(
					(item: any) => item.product_price_id === id,
				);
				return (
					<div className="text-xs">
						<span>{formatCurrency(itemDatabase.total_price)}</span>
					</div>
				);
			},
		},
	];

	var total = 0;
	total = itemsDatabase.reduce((acc: number, cur: any) => {
		acc += cur.total_price;
		return acc;
	}, 0);

	return (
		<>
			{/* {invoiceItemsQueue.length === 0 ? (
				<TablePlacholder />
			) : ( */}
			<PosTable
				data={queue}
				columns={InvoiceTableHeader}
				invoice={true}
				total={total}
			/>
			{/* )} */}
		</>
	);
};

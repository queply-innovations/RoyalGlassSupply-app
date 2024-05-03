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
			accessorKey: 'quantity',
			header: () => <div className="flex justify-center">Quantity</div>,
			cell: ({ row }) => {
				const id = row.original.id;
				const itemDatabase = itemsDatabase.find(
					(item: any) => item.product_price_id === id,
				);
				return (
					<div className="flex justify-center ">
						<div className="flex flex-row border drop-shadow-sm">
							{itemDatabase.quantity}
						</div>
					</div>
				);
			},
		},
		{
			accessorKey: 'name',
			header: () => <div className="justify-center">Product Name</div>,
			cell: ({ row }) => {
				return (
					<div className="flex flex-row gap-2">
						<span className="text-sm font-bold">
							{row.original.product.name}
						</span>
						{row.original.product.brand ? (
							<span className="text-sm">
								({row.original.product.brand})
							</span>
						) : null}
						<span className="text-[12px]">
							{row.original.product.size}
						</span>

						{row.original.product.color}
					</div>
				);
			},
		},
		{
			accessorKey: 'price',
			header: () => <div className="justify-center">Unit Cost</div>,
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
						<span>{formatCurrency(itemDatabase.product_price)}</span>
						{productOnSale?.sale_discount ? (
							<span className="text-sm font-light">
								({formatCurrency(productOnSale?.sale_discount ?? 0)})
							</span>
						) : null}
					</div>
				);
			},
		},
		{
			id: 'total_price',
			accessorKey: 'total_price',
			header: () => <div className="justify-center">Price</div>,
			cell: ({ row }) => {
				const id = row.original.id;
				const itemDatabase = itemsDatabase.find(
					(item: any) => item.product_price_id === id,
				);
				return (
					<div className="">
						<span>{formatCurrency(itemDatabase.total_price)}</span>
					</div>
				);
			},
			size: 250,
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

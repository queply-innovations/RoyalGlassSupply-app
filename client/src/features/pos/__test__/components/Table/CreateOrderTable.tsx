import { ColumnDef } from '@tanstack/react-table';
import { PosTable } from './PosTable';
import { TablePlacholder } from './EmptyPlaceholder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, X } from 'lucide-react';
import { useInvoicePos } from '../../context/__test__/InvoicePosContext';
import { formatCurrency } from '@/utils/FormatCurrency';
import { CartItem } from '../../types';

interface CreateOrderTableProps {}

export const CreateOrderTable = ({}: CreateOrderTableProps) => {
	const { handleInvoiceItemQuantity, removeInvoiceItem, cartItems } =
		useInvoicePos();

	const CreateOrderTableHeader: ColumnDef<CartItem>[] = [
		{
			id: 'orderItem',
			enableResizing: false,
			enableHiding: false,
			header: () => {
				return <div className="flex justify-center">#</div>;
			},
			cell: ({ row }) => {
				return <div className="flex justify-center ">{row.index + 1}</div>;
			},
			size: 100,
		},
		{
			accessorKey: 'name',
			enableHiding: false,
			header: () => <div className="justify-center">Product</div>,
			cell: ({ row }) => {
				return (
					<div className="flex flex-col ">
						<div className="flex flex-row gap-2">
							<span className="font-bold">
								{row.original.item.product.name}
							</span>

							<span className="font-medium">
								{row.original.item.product.size}
							</span>
						</div>
						<div className="flex flex-row items-center gap-1">
							{row.original.item.product.brand ? (
								<span className="">
									{row.original.item.product.brand}
								</span>
							) : (
								<span className="font-light">(No Brand)</span>
							)}
							<span className="">
								• {row.original.item.product.color}
							</span>
						</div>
					</div>
				);
			},
			size: 350,
		},
		{
			enableHiding: false,
			accessorKey: 'quantity',
			header: () => <div className="flex justify-center">Quantity</div>,
			size: 150,
			cell: ({ row }) => {
				const productIndex = row.index;
				const availableStocks =
					(row.original.item.inventory_product?.approved_stocks ?? 0) -
						(row.original.item.inventory_product?.purchased_stocks ??
							0) || 0;
				return (
					<div className="flex justify-center">
						<div className="flex flex-row">
							<Button
								className="rounded-none rounded-l bg-slate-500 p-3"
								onClick={() => {
									handleInvoiceItemQuantity(
										productIndex,
										availableStocks,
										cartItems[row.index].quantity - 1,
									);
								}}
								disabled={cartItems[row.index].quantity === 1}
							>
								<Minus size={14} className="text-white" />
							</Button>
							<Input
								id="quantity"
								className="w-14 rounded-none text-center text-xs"
								type="number"
								min={1}
								max={availableStocks}
								defaultValue={cartItems[productIndex].quantity}
								onBlur={e => {
									handleInvoiceItemQuantity(
										productIndex,
										Number(e.target.value),
										availableStocks,
									);
								}}
								onChange={e => {
									handleInvoiceItemQuantity(
										productIndex,
										availableStocks,
										Number(e.target.value),
									);
								}}
							/>
							<Button
								className="rounded-none rounded-r bg-slate-500 p-3"
								onClick={() => {
									handleInvoiceItemQuantity(
										productIndex,
										availableStocks,
										cartItems[row.index].quantity + 1,
									);
								}}
								disabled={
									cartItems[row.index].quantity >= availableStocks
								}
							>
								<Plus size={14} className="text-white" />
							</Button>
						</div>
					</div>
				);
			},
		},
		{
			accessorKey: 'price',
			enableHiding: false,
			header: () => <div className="justify-center">Price</div>,
			cell: ({ row }) => {
				return (
					<div className="flex flex-row gap-2 ">
						<span>{formatCurrency(row.original.product_price)}</span>
						{row.original.item.on_sale ? (
							<span className="text-sm font-light">
								({formatCurrency(row.original.item.sale_discount ?? 0)})
							</span>
						) : null}
					</div>
				);
			},
		},
		{
			id: 'total_price',
			enableHiding: false,
			accessorKey: 'total_price',
			header: () => <div className="justify-center">Subtotal</div>,
			cell: ({ row }) => {
				return (
					<div className="">
						<span>
							{formatCurrency(
								cartItems[row.index].quantity *
									row.original.product_price,
							)}
						</span>
					</div>
				);
			},

			size: 250,
		},
		{
			enableHiding: false,
			id: 'actions',
			size: 100,
			cell: ({ row }) => {
				return (
					<div className="flex flex-row justify-center  font-normal uppercase">
						<Button
							variant={'ghost'}
							size={'icon'}
							className="group bg-white/0 hover:cursor-pointer hover:bg-red-600"
							onClick={() => {
								removeInvoiceItem(row.index);
							}}
						>
							<X
								size={20}
								className="text-slate-700 group-hover:text-white"
							/>
						</Button>
					</div>
				);
			},
		},
	];
	return (
		<div className="h-full overflow-y-scroll">
			{cartItems.length === 0 ? (
				<>
					<TablePlacholder />
				</>
			) : (
				<PosTable data={cartItems} columns={CreateOrderTableHeader} />
			)}
		</div>
	);
};

import { ColumnDef } from '@tanstack/react-table';
import { usePos } from '../../context/PosContext';
import { PosTable } from './PosTable';
import { Items } from '../../types';
import { Button } from '@/components';
import { Input } from '@/components/ui/input';
import { TablePlacholder } from './EmptyPlaceholder';

interface CreateOrderTableProps {}

export const CreateOrderTable = ({}: CreateOrderTableProps) => {
	const { selectedProducts, quantityHandler } = usePos();

	const CreateOrderTableHeader: ColumnDef<Items>[] = [
		{
			id: 'orderItem',
			enableResizing: false,
			header: () => {
				return <div className="flex justify-center">Item #</div>;
			},
			// <div className="flex justify-center">Item #</div>,
			cell: ({ row }) => {
				return <div className="flex justify-center">{row.index + 1}</div>;
			},
		},
		{
			accessorKey: 'name',
			header: () => <div className="justify-center">Product Name</div>,
		},
		{
			accessorKey: 'type',
			header: () => <div className="justify-center">Type</div>,
		},
		{
			accessorKey: 'quantity',
			header: () => <div className="flex justify-center">Quantity</div>,
			cell: ({ row }) => {
				const productIndex = row.index;
				const maxQuantity =
					selectedProducts[productIndex].product.stocks_quantity ?? 0;

				return (
					<div className="flex justify-center ">
						<div className="flex flex-row border drop-shadow-sm">
							<Button
								className="rounded-sm bg-red-300 hover:bg-red-500"
								onClick={() => {
									quantityHandler(
										productIndex,
										row.original.quantity - 1,
										maxQuantity,
									);
								}}
							>
								<span>-</span>
							</Button>
							<Input
								className="w-20 rounded-none text-center drop-shadow-none"
								type="number"
								value={row.original.quantity || ''}
								onChange={e => {
									quantityHandler(
										productIndex,
										Number(e.target.value),
										maxQuantity,
									);
								}}
								disabled={maxQuantity <= 1 ? true : false}
							/>
							<Button
								className="rounded-sm bg-slate-500 hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-200"
								onClick={() => {
									quantityHandler(
										productIndex,
										row.original.quantity + 1,
										maxQuantity,
									);
								}}
								disabled={
									maxQuantity <= 1 ||
									maxQuantity <= row.original.quantity
										? true
										: false
								}
							>
								<span>+</span>
							</Button>
						</div>
					</div>
				);
			},
		},
		{
			accessorKey: 'price',
			header: () => <div className="justify-center">Product Price</div>,
			cell: ({ row }) => (
				<div className="">
					<span>₱ {String(row.original.price)}</span>
				</div>
			),
		},
		{
			accessorKey: 'subtotal',
			header: () => <div className="justify-center">Total</div>,
			cell: ({ row }) => (
				<div className="">
					<span>₱ {row.original.subtotal}</span>
				</div>
			),
		},
	];
	return (
		<>
			{selectedProducts.length === 0 ? (
				<TablePlacholder />
			) : (
				<PosTable
					data={selectedProducts}
					columns={CreateOrderTableHeader}
				/>
			)}
		</>
	);
};

import { ColumnDef } from '@tanstack/react-table';
import { usePos } from '../../context/PosContext';
import { PosTable } from './PosTable';
import { Items } from '../../types';
import { Product } from '@/features/product/__test__/types';
import { Button } from '@/components';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { TablePlacholder } from './EmptyPlaceholder';

interface CreateOrderTableProps {}

export const CreateOrderTable = ({}: CreateOrderTableProps) => {
	const { selectedProducts, setSelectedProducts } = usePos();
	console.log('selectedProducts', selectedProducts);
	const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

	const updateQuantity = (productId: number, newQuantity: number) => {
		setQuantities(prevQuantities => ({
			...prevQuantities,
			[productId]: newQuantity,
		}));
	};

	const handleUpdateQuantity = (productId: number, newQuantity: number) => {
		updateQuantity(productId, newQuantity);

		// If new quantity is greater than zero, update the selectedProducts array
		if (newQuantity > 0) {
			setSelectedProducts(prevSelectedProducts =>
				prevSelectedProducts.map(
					(item: { price: number }, index: number) => {
						if (index === productId) {
							// Ensure that `price` property exists and is a number
							if (typeof item.price === 'number') {
								return {
									...item,
									quantity: newQuantity,
									subtotal: item.price * newQuantity,
								};
							}
						}
						return item;
					},
				),
			);
		} else {
			// If new quantity is zero or less, remove the product from selectedProducts
			setSelectedProducts((prevSelectedProducts: Items[]) =>
				prevSelectedProducts.filter(
					(item: any, index: number) => index !== productId,
				),
			);
		}
	};

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
				const quantity = quantities[productIndex] || row.original.quantity;

				const quantityHandler = (newQuantity: number) => {
					handleUpdateQuantity(productIndex, newQuantity);
				};
				return (
					<div className="flex justify-center ">
						<div className="flex flex-row border drop-shadow-sm">
							<Button
								className="rounded-sm bg-red-300 hover:bg-red-500"
								onClick={() => {
									quantityHandler(quantity - 1);
								}}
							>
								<span>-</span>
							</Button>
							<Input
								className="w-20 rounded-none text-center drop-shadow-none"
								type="number"
								value={
									quantities[productIndex] || row.original.quantity
								}
								onChange={() => {}}
							/>
							<Button
								className="rounded-sm bg-slate-500 hover:bg-slate-700"
								onClick={() => {
									quantityHandler(quantity + 1);
								}}
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

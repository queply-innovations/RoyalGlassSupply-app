import { UseModalProps } from '@/utils/Modal';
import { useProductPricesMutation } from '../../hooks';
import { useState } from 'react';
import { Button } from '@/components';
import { toast } from 'react-toastify';
// import { useProductPricesPaginated } from '../../context/ProductPricesPaginatedContext';
import { useProductPrices } from '../../context/ProductPricesContext';

interface DeleteProdPriceProps {
	onClose: UseModalProps['closeModal'];
}

export const DeleteProdPrice = ({ onClose }: DeleteProdPriceProps) => {
	// const { selectedProductPrice } = useProductPricesPaginated();
	const { selectedProductPrice } = useProductPrices();

	const { deleteProductPricesMutation } = useProductPricesMutation();

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	// const handleDelete = () => {
	// 	if (selectedProductPrice) {
	// 		setIsSubmitting(true);
	// 		deleteProductPricesMutation(selectedProductPrice.id)
	// 			.then(res => {
	// 				toast.success(res.message);
	// 				onClose();
	// 			})
	// 			.catch(error => {
	// 				toast.error(
	// 					error.message
	// 						? error.message
	// 						: 'Failed to delete product listing.',
	// 				);
	// 			})
	// 			.finally(() => {
	// 				setIsSubmitting(false);
	// 			});
	// 	} else {
	// 		toast.error('No product selected.');
	// 	}
	// };
	const handleDelete = () => {
		setIsSubmitting(true);
		deleteProductPricesMutation(selectedProductPrice.id)
			.then(res => {
				toast.success(res.message);
				onClose();
			})
			.catch(error => {
				toast.error(
					error.message
						? error.message
						: 'Failed to delete product listing.',
				);
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	};
	// return (
	// 	<div className="flex max-w-lg flex-col gap-4">
	// 		<h2 className="text-sm font-medium text-slate-800">
	// 			Are you sure you would like to delete this item? This action{' '}
	// 			<strong>cannot</strong>&nbsp; be undone.
	// 		</h2>

	// 		<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-3">
	// 			<div className="col-span-3 flex flex-col justify-center gap-1">
	// 				<h3 className="text-sm font-bold text-gray-600">Name</h3>
	// 				<p className="text-sm">
	// 					{selectedProductPrice?.product.name ?? 'No name'}
	// 				</p>
	// 			</div>
	// 			<div className="col-span-3 flex flex-col justify-center gap-1">
	// 				<h3 className="text-sm font-bold text-gray-600">Brand</h3>
	// 				<p className="text-sm">
	// 					{selectedProductPrice?.product.brand || 'No brand'}
	// 				</p>
	// 			</div>
	// 			<div className="col-span-3 flex flex-col justify-center gap-1">
	// 				<h3 className="text-sm font-bold text-gray-600">Serial No.</h3>
	// 				<p className="text-sm">
	// 					{selectedProductPrice?.product.serial_no ??
	// 						'No serial number'}
	// 				</p>
	// 			</div>
	// 			<div className="col-span-3 flex flex-col justify-center	gap-1">
	// 				<h3 className="text-sm font-bold text-gray-600">Inventory</h3>
	// 				<p className="text-sm">
	// 					{selectedProductPrice?.inventory_product.inventory.code ??
	// 						'No inventory'}
	// 				</p>
	// 			</div>
	// 			<div className="col-span-3 flex flex-col justify-center gap-1">
	// 				<h3 className="text-sm font-bold text-gray-600">Size</h3>
	// 				<p className="text-sm">
	// 					{selectedProductPrice?.product.size ?? 'No size'}
	// 				</p>
	// 			</div>
	// 			<div className="col-span-3 flex flex-col justify-center gap-1">
	// 				<h3 className="text-sm font-bold text-gray-600">Color</h3>
	// 				<p className="text-sm">
	// 					{selectedProductPrice?.product.color ?? 'No color'}
	// 				</p>
	// 			</div>
	// 			<div className="col-span-3 flex flex-col justify-center	gap-1">
	// 				<h3 className="text-sm font-bold text-gray-600">Unit</h3>
	// 				<p className="text-sm">
	// 					{selectedProductPrice?.unit ?? 'No unit'}
	// 				</p>
	// 			</div>
	// 			<div className="col-span-3 flex flex-col justify-center	gap-1">
	// 				<h3 className="text-sm font-bold text-gray-600">Warehouse</h3>
	// 				<p className="text-sm">
	// 					{selectedProductPrice?.warehouse.code ?? 'No warehouse'}
	// 				</p>
	// 			</div>
	// 			<div className="col-span-4 flex flex-col justify-center	gap-1">
	// 				<h3 className="text-sm font-bold text-gray-600">
	// 					Capital Price
	// 				</h3>
	// 				<p className="text-sm">
	// 					{new Intl.NumberFormat('en-US', {
	// 						style: 'currency',
	// 						currency: 'PHP',
	// 					}).format(selectedProductPrice?.price ?? 0)}
	// 				</p>
	// 			</div>
	// 			<div className="col-span-4 flex flex-col justify-center	gap-1">
	// 				<h3 className="text-sm font-bold text-gray-600">Markup Price</h3>
	// 				<p className="text-sm">
	// 					{new Intl.NumberFormat('en-US', {
	// 						style: 'currency',
	// 						currency: 'PHP',
	// 					}).format(selectedProductPrice?.markup_price ?? 0)}
	// 				</p>
	// 			</div>
	// 			<div className="col-span-4 flex flex-col justify-center	gap-1">
	// 				<h3 className="text-sm font-bold text-gray-600">Price</h3>
	// 				<p className="text-sm">
	// 					{new Intl.NumberFormat('en-US', {
	// 						style: 'currency',
	// 						currency: 'PHP',
	// 					}).format(selectedProductPrice?.price ?? 0)}
	// 				</p>
	// 			</div>
	// 		</div>

	// 		<div className="mt-4 flex flex-row justify-end gap-4">
	// 			<Button
	// 				fill={'red'}
	// 				type="submit"
	// 				onClick={handleDelete}
	// 				disabled={isSubmitting}
	// 				className="py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
	// 			>
	// 				{isSubmitting ? 'Deleting...' : 'Yes, delete'}
	// 			</Button>
	// 			<Button
	// 				fill={'default'}
	// 				type="reset"
	// 				onClick={() => onClose()}
	// 				disabled={isSubmitting}
	// 				className="py-2 text-sm font-bold text-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
	// 			>
	// 				No, cancel
	// 			</Button>
	// 		</div>
	// 	</div>
	// );
	return (
		<div className="flex max-w-md flex-col gap-4">
			<h2 className="text-sm font-medium text-slate-800">
				Are you sure you would like to delete this item? This action{' '}
				<strong>cannot</strong>&nbsp; be undone.
			</h2>

			<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-3">
				<div className="col-span-3 flex flex-col justify-center gap-1">
					<h3 className="text-sm font-bold text-gray-600">Name</h3>
					<p className="text-sm">{selectedProductPrice.product.name}</p>
				</div>
				<div className="col-span-3 flex flex-col justify-center gap-1">
					<h3 className="text-sm font-bold text-gray-600">Brand</h3>
					<p className="text-sm">
						{selectedProductPrice.product.brand || 'No brand'}
					</p>
				</div>
				<div className="col-span-6 flex flex-col justify-center gap-1">
					<h3 className="text-sm font-bold text-gray-600">Serial No.</h3>
					<p className="text-sm">
						{selectedProductPrice.product.serial_no}
					</p>
				</div>
				<div className="col-span-3 flex flex-col justify-center gap-1">
					<h3 className="text-sm font-bold text-gray-600">Size</h3>
					<p className="text-sm">{selectedProductPrice.product.size}</p>
				</div>
				<div className="col-span-3 flex flex-col justify-center gap-1">
					<h3 className="text-sm font-bold text-gray-600">Color</h3>
					<p className="text-sm">{selectedProductPrice.product.color}</p>
				</div>
				<div className="col-span-3 flex flex-col justify-center	gap-1">
					<h3 className="text-sm font-bold text-gray-600">Unit</h3>
					<p className="text-sm">{selectedProductPrice.unit}</p>
				</div>
				<div className="col-span-3 flex flex-col justify-center	gap-1">
					<h3 className="text-sm font-bold text-gray-600">Warehouse</h3>
					<p className="text-sm">{selectedProductPrice.warehouse.code}</p>
				</div>
				<div className="col-span-4 flex flex-col justify-center	gap-1">
					<h3 className="text-sm font-bold text-gray-600">
						Capital Price
					</h3>
					<p className="text-sm">
						{new Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'PHP',
						}).format(selectedProductPrice.price)}
					</p>
				</div>
				<div className="col-span-4 flex flex-col justify-center	gap-1">
					<h3 className="text-sm font-bold text-gray-600">Markup Price</h3>
					<p className="text-sm">
						{new Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'PHP',
						}).format(selectedProductPrice.markup_price)}
					</p>
				</div>
				<div className="col-span-4 flex flex-col justify-center	gap-1">
					<h3 className="text-sm font-bold text-gray-600">Price</h3>
					<p className="text-sm">
						{new Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'PHP',
						}).format(selectedProductPrice.price)}
					</p>
				</div>
			</div>

			<div className="mt-4 flex flex-row justify-end gap-4">
				<Button
					fill={'red'}
					type="submit"
					onClick={handleDelete}
					disabled={isSubmitting}
					className="py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isSubmitting ? 'Deleting...' : 'Yes, delete'}
				</Button>
				<Button
					fill={'default'}
					type="reset"
					onClick={() => onClose()}
					disabled={isSubmitting}
					className="py-2 text-sm font-bold text-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
				>
					No, cancel
				</Button>
			</div>
		</div>
	);
};

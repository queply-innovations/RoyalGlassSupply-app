import { Button } from '@/components/Button';
import { useInventoryProductsByInventory } from '@/features/inventory/context';
import { useInventoryProdsMutation } from '@/features/inventory/hooks';
import { UseModalProps } from '@/utils/Modal';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface DeleteInventoryProductProps {
	onClose: UseModalProps['closeModal'];
}

export const DeleteInventoryProduct = ({
	onClose,
}: DeleteInventoryProductProps) => {
	const { selectedInventoryProduct } = useInventoryProductsByInventory();
	const { deleteInventoryProductMutation } = useInventoryProdsMutation();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const handleDelete = () => {
		setIsSubmitting(true);
		deleteInventoryProductMutation(selectedInventoryProduct.id)
			.then(res => {
				toast.success(res.message);
				onClose();
			})
			.catch(error => {
				toast.error(
					error.message
						? error.message
						: 'Failed to delete inventory product.',
				);
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	};

	return (
		<div className="flex max-w-md flex-col gap-4">
			<h2 className="text-sm font-medium text-slate-800">
				Are you sure you would like to delete this item? This action{' '}
				<strong>cannot</strong>&nbsp; be undone.
			</h2>

			<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-5">
				<div className="col-span-4 flex flex-col justify-center gap-1">
					<h3 className="text-sm font-bold text-gray-600">Name</h3>
					<p className="text-sm">
						{selectedInventoryProduct.product.name}
					</p>
				</div>
				<div className="col-span-4 flex flex-col justify-center gap-1">
					<h3 className="text-sm font-bold text-gray-600">Serial No.</h3>
					<p className="text-sm">
						{selectedInventoryProduct.product.serial_no}
					</p>
				</div>
				<div className="col-span-4 flex flex-col justify-center gap-1">
					<h3 className="text-sm font-bold text-gray-600">Brand</h3>
					<p className="text-sm">
						{selectedInventoryProduct.product.brand || (
							<span className="opacity-50">No brand</span>
						)}
					</p>
				</div>
				<div className="col-span-4 flex flex-col justify-center gap-1">
					<h3 className="text-sm font-bold text-gray-600">Size</h3>
					<p className="text-sm">
						{selectedInventoryProduct.product.size}
					</p>
				</div>
				<div className="col-span-4 flex flex-col justify-center gap-1">
					<h3 className="text-sm font-bold text-gray-600">Color</h3>
					<p className="text-sm">
						{selectedInventoryProduct.product.color}
					</p>
				</div>
				<div className="col-span-4 flex flex-col justify-center gap-1">
					<h3 className="text-sm font-bold text-gray-600">Supplier</h3>
					<p className="text-sm">
						{selectedInventoryProduct.supplier_id.name}
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

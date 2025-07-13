import { UseModalProps } from '@/utils/Modal';
import { useProducts } from '../../context/ProductContext';
import { Button } from '@/components';
import { toast } from 'react-toastify';
import { useProductMutation } from '../../hooks';

interface DeleteProductProps {
	onClose: UseModalProps['closeModal'];
}

export const DeleteProduct = ({ onClose }: DeleteProductProps) => {
	const { selectedProduct, setSelectedProduct, isDeletable } = useProducts();
	const { handleDeleteProduct } = useProductMutation();

	return (
		<>
			<div className="flex min-w-[42rem] max-w-2xl flex-col gap-4 font-medium">
				<div className="mt-3 grid w-full grid-flow-row grid-cols-12 gap-x-6 gap-y-3">
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Name</h3>
						<p className="text-sm text-gray-800">
							{selectedProduct?.name}
						</p>
					</div>
					<div className="col-span-8 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Serial number</h3>
						<p className="text-sm text-gray-800">
							{selectedProduct?.serial_no}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Brand</h3>
						<p className="text-sm text-gray-800">
							{selectedProduct?.brand || (
								<span className="opacity-60">No brand</span>
							)}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Size</h3>
						<p className="text-sm text-gray-800">
							{selectedProduct?.size}
						</p>
					</div>
					<div className="col-span-4 flex flex-col justify-center gap-1">
						<h3 className="text-sm font-bold">Color</h3>
						<p className="text-sm text-gray-800">
							{selectedProduct?.color}
						</p>
					</div>
					{selectedProduct?.notes && (
						<div className="col-span-12 flex flex-col justify-center gap-1">
							<h3 className="text-sm font-bold">Notes</h3>
							<p className="text-sm text-gray-800">
								{selectedProduct?.notes}
							</p>
						</div>
					)}
				</div>
				<hr className="h-px w-full border-0 bg-gray-200" />
				<div className="flex flex-row justify-between">
					<p
						className={`max-w-[50%] text-sm ${isDeletable !== undefined && !isDeletable && 'text-red-700'}`}
					>
						{isDeletable !== undefined
							? isDeletable
								? 'This product can be deleted. Are you sure you want to proceed? This action cannot be undone.'
								: 'This product cannot be deleted because it is associated with existing product price and inventory items.'
							: 'Checking if the product can be deleted...'}
					</p>
					<div className="mt-auto flex-none space-x-4">
						{isDeletable && (
							<Button
								className="flex-1 cursor-pointer bg-red-600 py-2 text-sm font-bold text-white hover:bg-red-700 disabled:pointer-events-none disabled:opacity-50"
								disabled={!isDeletable}
								onClick={() => {
									if (selectedProduct) {
										handleDeleteProduct(selectedProduct.id)
											.then(() => {
												toast.success(
													'Product deleted successfully.',
												);
												setSelectedProduct(undefined);
												onClose();
											})
											.catch(() => {
												toast.error(
													'An error occurred while deleting the product.',
												);
											});
									}
								}}
							>
								Yes, delete
							</Button>
						)}
						<Button
							type="reset"
							fill={'default'}
							className="flex-1 py-2 text-sm font-bold text-gray-700 hover:text-white"
							onClick={onClose}
						>
							{isDeletable ? 'No, cancel' : 'Close'}
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

import { UseModalProps } from '@/utils/Modal';
import { useProductPrices } from '../..';
import { useProductPricesMutation } from '../../hooks';
import { useState } from 'react';
import { Button } from '@/components';

interface ProdPriceActiveToggleProps {
	onClose: UseModalProps['closeModal'];
}

export const ProdPriceActiveToggle = ({
	onClose,
}: ProdPriceActiveToggleProps) => {
	const { patchProductPricesMutation } = useProductPricesMutation();
	const { selectedProductPrice } = useProductPrices();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleToggle = async () => {
		setIsSubmitting(!isSubmitting);
		const response = patchProductPricesMutation({
			id: selectedProductPrice.id,
			data: {
				active_status:
					selectedProductPrice.active_status === 'active'
						? 'inactive'
						: 'active',
			},
		});
		return response;
	};

	return (
		<div className="flex min-w-max flex-col gap-3">
			<h2 className="text-sm text-gray-800">
				Are you sure you'd like to set this listing to{' '}
				<strong>
					{selectedProductPrice.active_status === 'active'
						? 'inactive'
						: 'active'}
				</strong>
				?
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
			<div className="flex w-full flex-row justify-between pt-4">
				<div className="ml-auto flex flex-row gap-4 whitespace-nowrap">
					<Button
						type="reset"
						fill={'default'}
						className="flex-1 py-2 text-sm font-bold text-gray-700 hover:text-white"
						onClick={onClose}
					>
						Cancel
					</Button>
					<Button
						fill={'green'}
						onClick={async () => {
							const response = await handleToggle();
							response.status === 200
								? onClose()
								: setError('Failed to update active status');
						}}
						disabled={isSubmitting} // Disable button if submitting
						className="flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
					>
						{!isSubmitting
							? `Set to ${
									selectedProductPrice.active_status === 'active'
										? 'inactive'
										: 'active'
								}`
							: 'Applying...'}
					</Button>
				</div>
			</div>
			{error && (
				<div className="flex w-full flex-row justify-center gap-4">
					<p className="text-sm font-bold text-red-600">{error}</p>
				</div>
			)}
		</div>
	);
};

import React, { FormEvent } from 'react';
import {
	ItemCapitalPrice,
	ItemStocksCount,
	SelectProducts,
} from './components';
import { Button as LegacyButton } from '@/components';
import { useNewTransfer } from '@/features/transfer/context/NewTransferContext';
import { useState } from 'react';
import { TransferProduct } from '@/features/transfer/types';

interface TransferItemsQueueFormProps {
	setActiveView: React.Dispatch<React.SetStateAction<any>>;
	editProduct: Omit<TransferProduct, 'transfer_id'>;
}

export const TransferItemsQueueForm = ({
	setActiveView,
	editProduct,
}: TransferItemsQueueFormProps) => {
	const { newTransfer, handleChange } = useNewTransfer();
	const [selectedProduct, setSelectedProduct] = useState<
		Omit<TransferProduct, 'transfer_id'> | any
	>(editProduct || null);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const updatedTransferItems = [...newTransfer.transferItems];

		let selectedIndex = updatedTransferItems.findIndex(
			item => item.id === selectedProduct.id,
		);

		if (selectedIndex !== -1) {
			updatedTransferItems[selectedIndex] = {
				...updatedTransferItems[selectedIndex],
				...selectedProduct,
			};
		} else {
			updatedTransferItems.push({ ...selectedProduct });
		}

		handleChange('transferItems', updatedTransferItems);
		setActiveView('table');
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="flex w-full flex-col gap-3">
					<SelectProducts
						selectedProduct={selectedProduct}
						setSelectedProduct={setSelectedProduct}
					/>
					<hr />
					<div className="flex flex-row justify-between gap-2">
						<ItemCapitalPrice
							selectedProduct={selectedProduct}
							setSelectedProduct={setSelectedProduct}
						/>
						<ItemStocksCount
							selectedProduct={selectedProduct}
							setSelectedProduct={setSelectedProduct}
						/>
					</div>
					<div className="flex justify-end">
						<LegacyButton
							type="submit"
							fill={'green'}
							// disabled={true} // Disable button if no product/supplier selected
							className="max-w-fit flex-1 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
						>
							{`Add Item to Queue`}
						</LegacyButton>
					</div>
				</div>
			</form>
		</>
	);
};

import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import {
	PendingProductPriceDetails,
	PendingProductPriceEdit,
	PendingProductPriceProvider,
} from '@/features/pending/pending-product-price';
import { PendingProductPriceTable } from '@/features/pending/pending-product-price/components';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { useModal } from '@/utils/Modal';
import { ProductPrices as ProdPriceType } from '@/features/product/__test__/types';

export const PendingProductPrice = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');
	const modalHandler = (productPrice: ProdPriceType, action: string) => {
		setModalAction(action);
		openModal();
	};

	return (
		<>
			<MainLayout title="Pending Listing">
				<PendingProductPriceProvider>
					<div className="flex max-h-full flex-1 flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="w-full overflow-x-hidden rounded-lg border border-black/10">
							<PendingProductPriceTable
								openModal={modalHandler}
								isModalOpen={isOpen}
							/>
						</div>
					</div>
					<ModalTest
						title={
							modalAction === 'details'
								? 'Price Details'
								: modalAction === 'edit'
									? 'Edit Price'
									: ''
						}
						isOpen={isOpen}
						onClose={closeModal}
						closeOnOverlayClick={
							modalAction === 'details' ||
							modalAction === 'toggle_active_stat'
						}
					>
						<>
							{modalAction === 'details' && (
								<PendingProductPriceDetails />
							)}
							{modalAction === 'edit' && (
								<PendingProductPriceEdit onClose={closeModal} />
							)}
						</>
					</ModalTest>
				</PendingProductPriceProvider>
			</MainLayout>
		</>
	);
};

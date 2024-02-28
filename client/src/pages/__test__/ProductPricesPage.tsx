import { useState } from 'react';
import { ProductPricesProvider } from '@/features/product/__test__/context/ProductPricesContext';
import { MainLayout } from '@/layouts/MainLayout';
import { ProductPrices as ProdPriceType } from '@/features/product/__test__/types';
import {
	ProdPriceDetails,
	ProdPriceToggleActiveStat,
	ProductPricesTable,
} from '@/features/product/__test__/components';
import { useModal } from '@/utils/Modal';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { ProductPricesForm } from '../../features/product/__test__/components/forms/ProductPricesForm';

export const ProductPrices = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	const modalHandler = (productPrice: ProdPriceType, action: string) => {
		openModal();
		setModalAction(action);
	};

	return (
		<>
			<MainLayout title="Product Listings">
				<ProductPricesProvider>
					<div className="flex flex-auto flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<ProductPricesTable openModal={modalHandler} />
						</div>
					</div>
					<ModalTest
						title={
							modalAction === 'details'
								? 'Listing Details'
								: modalAction === 'edit'
									? 'Edit Listing'
									: 'Toggle Active Status'
						}
						isOpen={isOpen}
						onClose={closeModal}
					>
						<>
							{modalAction === 'details' && (
								<ProdPriceDetails onClose={closeModal} />
							)}
							{modalAction === 'edit' && (
								<ProductPricesForm onClose={closeModal} />
							)}
							{modalAction === 'toggle_active_stat' && (
								<ProdPriceToggleActiveStat onClose={closeModal} />
							)}
						</>
					</ModalTest>
				</ProductPricesProvider>
			</MainLayout>
		</>
	);
};

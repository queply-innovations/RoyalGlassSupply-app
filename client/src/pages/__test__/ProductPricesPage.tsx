import { useState } from 'react';
import { ProductPricesProvider } from '@/features/product/__test__/context/ProductPricesContext';
import { MainLayout } from '@/layouts/MainLayout';
import {
	Product as ProductType,
	ProductPrices as ProdPriceType,
} from '@/features/product/__test__/types';
import {
	ProdPriceDetails,
	ProdPriceActiveToggle,
	ProductPricesTable,
} from '@/features/product/__test__/components';
import { useModal } from '@/utils/Modal';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { ProductPricesForm } from '../../features/product/__test__/components/forms/ProductPricesForm';
import { AddProductPrice } from '@/features/product/__test__/components';

export const ProductPrices = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');
	console.log('modal state: ', isOpen);

	const modalHandler = (
		productPrice: ProdPriceType | ProductType,
		action: string,
	) => {
		setModalAction(action);
		openModal();
	};

	return (
		<>
			<MainLayout title="Product Listings">
				<ProductPricesProvider>
					<div className="flex max-h-full flex-1 flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<ProductPricesTable
								openModal={modalHandler}
								isModalOpen={isOpen}
							/>
						</div>
					</div>
					<ModalTest
						title={
							modalAction === 'add'
								? 'Add Listing'
								: modalAction === 'details'
									? 'Listing Details'
									: modalAction === 'edit'
										? 'Edit Listing'
										: modalAction === 'toggle_active_stat'
											? 'Toggle Active Status'
											: ''
						}
						isOpen={isOpen}
						onClose={closeModal}
					>
						<>
							{modalAction === 'add' && (
								<AddProductPrice onClose={closeModal} />
							)}
							{modalAction === 'details' && (
								<ProdPriceDetails onClose={closeModal} />
							)}
							{modalAction === 'edit' && (
								<ProductPricesForm onClose={closeModal} />
							)}
							{modalAction === 'toggle_active_stat' && (
								<ProdPriceActiveToggle onClose={closeModal} />
							)}
						</>
					</ModalTest>
				</ProductPricesProvider>
			</MainLayout>
		</>
	);
};

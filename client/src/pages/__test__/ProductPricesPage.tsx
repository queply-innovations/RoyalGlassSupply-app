import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import {
	ProdPriceDetails,
	ProductPricesTable,
	DeleteProdPrice,
} from '@/features/product/__test__/components';
import { useModal } from '@/utils/Modal';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { ProductPricesForm } from '../../features/product/__test__/components/forms/ProductPricesForm';
import { ProductPricesPaginatedProvider } from '@/features/product/__test__/context/ProductPricesPaginatedContext';
import { WarehouseFilter } from '@/features/product/__test__/components/WarehouseFilter';
import { SearchProduct } from '@/features/product/__test__/components/SearchProduct';

export const ProductPrices = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	const modalHandler = (action: string) => {
		setModalAction(action);
		openModal();
	};

	return (
		<>
			<MainLayout title="Product Listings">
				<ProductPricesPaginatedProvider>
					<div className="flex h-full flex-1 flex-col gap-5 rounded-xl border border-black/10 bg-white p-4">
						<div className="flex flex-row justify-between gap-4">
							<div className="flex flex-shrink grow-0 items-center space-x-4">
								<SearchProduct />
							</div>
							<div className="flex flex-none flex-row items-center space-x-4">
								<span className="text-sm font-medium">
									Filter warehouse:{' '}
								</span>
								<WarehouseFilter />
							</div>
						</div>
						<div className="max-h-[calc(100%-4rem)] w-full flex-1 rounded-md border">
							<ProductPricesTable openModal={modalHandler} />
						</div>
					</div>
					<ModalTest
						title={
							modalAction === 'details'
								? 'Listing Details'
								: modalAction === 'edit'
									? 'Edit Listing'
									: modalAction === 'delete'
										? 'Delete Listing'
										: ''
						}
						isOpen={isOpen}
						onClose={closeModal}
						closeOnOverlayClick={modalAction === 'details'}
					>
						<>
							{modalAction === 'details' && <ProdPriceDetails />}
							{modalAction === 'edit' && (
								<ProductPricesForm onClose={closeModal} />
							)}
							{modalAction === 'delete' && (
								<DeleteProdPrice onClose={closeModal} />
							)}
						</>
					</ModalTest>
				</ProductPricesPaginatedProvider>
			</MainLayout>
		</>
	);
};

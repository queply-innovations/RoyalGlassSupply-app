import { useState } from 'react';
import { ProductPricesProvider } from '@/features/product/__test__/context/ProductPricesContext';
import { MainLayout } from '@/layouts/MainLayout';
import { ProductPrices as ProdPriceType } from '@/features/product/__test__/types';
import { ProductPricesTable } from '@/features/product/__test__/components';
import { useModal } from '@/utils/Modal';

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
				</ProductPricesProvider>
			</MainLayout>
		</>
	);
};

import { useState } from 'react';
import { ProductsProvider } from '@/features/product/__test__/context/ProductContext';
import { MainLayout } from '@/layouts/MainLayout';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { ProductsTable } from '@/features/product/__test__/components';
import { Product as IProduct } from '@/features/product/__test__/types';
import { useModal } from '@/utils/Modal';
import { AddProductForm } from '@/features/product/__test__/components/forms/AddProdForm';

export const Products = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	const modalHandler = (product: IProduct, action: string) => {
		openModal();
		setModalAction(action);
		// console.log('action', action, '; item', product);
	};

	return (
		<>
			<MainLayout title="Products">
				<ProductsProvider>
					<div className="flex flex-auto flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<ProductsTable openModal={modalHandler} />
						</div>
					</div>

					<ModalTest
						isOpen={isOpen}
						onClose={closeModal}
						title="Add Products"
					>
						<AddProductForm onClose={closeModal} />
					</ModalTest>
				</ProductsProvider>
			</MainLayout>
		</>
	);
};

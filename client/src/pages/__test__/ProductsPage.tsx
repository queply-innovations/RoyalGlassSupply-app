import { useState } from 'react';
import { ProductsProvider } from '@/features/product/__test__/context/ProductContext';
import { MainLayout } from '@/layouts/MainLayout';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { ProductsTable } from '@/features/product/__test__/components';
import { Product as IProduct } from '@/features/product/__test__/types';
import { useModal } from '@/utils/Modal';
import { AddProductForm } from '@/features/product/__test__/components/forms/AddProdForm';
import { EditProductForm } from '@/features/product/__test__/components/forms/EditProdForm';

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
					<div className="flex h-full flex-1 flex-col gap-5 rounded-xl border border-black/10 bg-white p-4">
						<div className="max-h-full w-full flex-1 rounded-md border border-black/10">
							<ProductsTable openModal={modalHandler} />
						</div>
					</div>

					<ModalTest
						isOpen={isOpen}
						onClose={closeModal}
						title={modalAction === 'add' ? 'Add Product' : 'Edit Product'}
					>
						<>
							{modalAction === 'add' && (
								<AddProductForm onClose={closeModal} />
							)}
							{modalAction === 'edit' && (
								<EditProductForm onClose={closeModal} />
							)}
						</>
					</ModalTest>
				</ProductsProvider>
			</MainLayout>
		</>
	);
};

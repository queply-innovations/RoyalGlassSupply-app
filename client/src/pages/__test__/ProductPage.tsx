import { useState } from 'react';
import { ProductsProvider } from '@/features/product/__test__/context/ProductContext';
import { MainLayout } from '@/layouts/MainLayout';
import { Form } from '@/features/product/__test__/components/forms/Form';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { ProductsTable } from '@/features/product/__test__/components';
import { ProductPrices as IProduct } from '@/features/product/__test__/types';
import { useModal } from '@/utils/Modal';
import { ProductDetails } from '@/features/product/__test__/components/ProductDetails';

export const Products = () => {
	const { isOpen, openModal, closeModal } = useModal();
	const [modalAction, setModalAction] = useState<string>('');

	const openProductModal = (product: IProduct, action: string) => {
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
							<ProductsTable openModal={openProductModal} />
						</div>
					</div>
					<ModalTest
						isOpen={isOpen}
						onClose={closeModal}
						title={
							modalAction === 'more_info'
								? 'Product Details'
								: 'This a modal'
						}
					>
						{modalAction === 'more_info' ? (
							<ProductDetails onClose={closeModal} />
						) : (
							<h1>Hello</h1>
						)}
					</ModalTest>
					{/* <ModalTest isOpen onClose={closeModal} title="Add Products">
						<Form onClose={closeModal} />
					</ModalTest> */}
				</ProductsProvider>
			</MainLayout>
		</>
	);
};

import { ProductsProvider } from '@/features/product/__test__/context/ProductContext';
import { MainLayout } from '@/layouts/MainLayout';
import { Form } from '@/features/product/__test__/components/forms/Form';
import { ModalTest } from '@/components/__test__/Modal/Modal';

export const Products = () => {
	const closeModal = () => {};
	return (
		<>
			<MainLayout title="Products">
				<ProductsProvider>
					<ModalTest isOpen onClose={closeModal} title="Add Products">
						<Form onClose={closeModal} />
					</ModalTest>
				</ProductsProvider>
			</MainLayout>
		</>
	);
};

import { ProductsProvider } from '@/features/product/__test__/context/ProductContext';
import { MainLayout } from '@/layouts/MainLayout';
import { Form } from '@/features/product/__test__/components/forms/Form';
import { ModalTest } from '@/components/__test__/Modal/Modal';
import { ProductsTable } from '@/features/product/__test__/components';

export const Products = () => {
	const openProductModal = () => {};
	const closeModal = () => {};
	return (
		<>
			<MainLayout title="Products">
				<ProductsProvider>
					<div className="flex flex-auto flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<ProductsTable openModal={openProductModal} />
						</div>
					</div>
					{/* <ModalTest isOpen onClose={closeModal} title="Add Products">
						<Form onClose={closeModal} />
					</ModalTest> */}
				</ProductsProvider>
			</MainLayout>
		</>
	);
};

import { Button, Modal, Inputbox } from '@/components';
import LayoutWrapper from '@/layouts/Layout';
import { ProductForm, ProductTable } from '@pages/Products';
import { useProducts } from '@/utils/api/Products';
import { useModal } from '@/utils/Modal';
import { ProductPricesForm } from './Forms/ProductPricesForm';

export const Products = () => {
	const { data: products } = useProducts();
	const { isOpen, openModal, closeModal } = useModal();

	return (
		<>
			<LayoutWrapper>
				<div className="flex h-full flex-col gap-y-4">
					<h1 className="page-title text-primary-dark-gray text-3xl font-bold">
						Products
					</h1>
					<div className="flex flex-auto flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="flex flex-row justify-between">
							<Inputbox
								placeholder="Search"
								variant={'searchbar'}
								buttonIcon={'outside'}
								className="w-1/2"
							/>
							<div className="flex flex-row gap-3">
								<Button fill={'green'} onClick={openModal}>
									Add Products
								</Button>
							</div>
						</div>
						<div className="w-full overflow-x-hidden rounded-lg border border-black/10">
							{/* <ProductTable data={products} /> */}
							<ProductPricesForm />
						</div>
					</div>
				</div>
				<Modal
					title={'Add Products'}
					isOpen={isOpen}
					onClose={closeModal}
					closeButton
				>
					<ProductForm data={products} onClose={closeModal} />
				</Modal>
			</LayoutWrapper>
		</>
	);
};

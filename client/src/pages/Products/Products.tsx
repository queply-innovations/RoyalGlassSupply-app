import { Button, Modal, Inputbox } from '@/components';
import LayoutWrapper from '@/layouts/Layout';
import { ProductForm, ProductTable } from '@pages/Products';
import { useProducts, useProductsPrices } from '@/api/Products';
import { useModal } from '@/utils/Modal';

export const Products = () => {
	const { data: products } = useProducts();
	const { data: productPrices } = useProductsPrices();
	// console.log('Product Data:', productPrices?.map(price => price.product_id));
	// console.log('Product ID:', products?.map(product => product.id));

	const { isOpen, openModal, closeModal } = useModal();
	// const mappedData = products?.map(product => {
	// 	const productPrice = productPrices?.find(
	// 		price => price.product_id === product.id,
	// 	);
	// 	return {
	// 		...product,
	// 		...productPrice,
	// 	};
	// });
	// console.log('data:', mappedData);

	const combinedData = products?.map(product => {
		const priceData = productPrices?.find(price => product.id === price.id);

		return {
			id: product.id,
			product_name: product.product_name,
			product_id: priceData ? priceData.product_id : '',
			serial_number: product.serial_number,
			size: product.size,
			color: product.color,
			quantity: priceData ? priceData.quantity : '',
			type: priceData ? priceData.type : '',
			capital_price: priceData ? priceData.capital_price : '',
			retail_price: priceData ? priceData.retail_price : '',
			markup_price: priceData ? priceData.markup_price : '',
			approval_status: priceData ? priceData.approval_status : '',
			on_sale: priceData ? priceData.on_sale : '',
			sale_price: priceData ? priceData.sale_price : '',

			// Add other properties as needed
		};
	});
	// console.log('combinedData:', combinedData);

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
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<ProductTable data={combinedData} />
							{/* <ProductPricesForm /> */}
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
					{/* <ProductFormTable /> */}
				</Modal>
			</LayoutWrapper>
		</>
	);
};

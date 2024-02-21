import { Button, Modal, Inputbox, Pagination, ProgressBar } from '@/components';
import LayoutWrapper from '@/layouts/Layout';
import { ProductForm, ProductTable } from '@pages/Products';
import { getProducts, getProductPrices } from '@/features/auth/api/getProducts';
import { useModal } from '@/utils/Modal';
import { useEffect, useState } from 'react';
import { Product, ProductPrices } from '@/entities';

export const Products = () => {
	// const { data: products } = getProducts();
	const [products, setProducts] = useState(Array<Product>); //products
	// const { data: productPrices } = getProductPrices();
	const [productPrices, setProductPrices] = useState(Array<ProductPrices>); //product prices

	// console.log('Product Data:', productPrices?.map(price => price.product_id));
	// console.log('Product ID:', products?.map(product => product.id));
	const [ notLoading, setNotLoading ] = useState(false);

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

	useEffect(() => {
		async function gettingProducts(){
			try {
				const data3 = await getProducts();
				setProducts(data3.data.data);
				//setNotLoading(true);
			} catch (error) {
				console.log(error);
			}
		}
		gettingProducts();
	}, []);

	useEffect(() => {
		async function gettingProductPrices(){
			try {
				const data3 = await getProductPrices();
				setProductPrices(data3.data.data);
				setNotLoading(true);
			} catch (error) {
				console.log(error);
			}
		}
		gettingProductPrices();
	}, []);

	const combinedData = products?.map(product => {
		const priceData = productPrices?.find(price => product.id === price.id);

		return {
			id: product.id,
			product_name: product.name,
			product_id: priceData ? priceData.product_id : '',
			serial_number: product.serial_no,
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
			//TODO: Add warehouse_id?
		};
	});

	const loading = (
		<div className="flex w-full h-full flex-col items-center justify-center space-y-0 px-20">
			<ProgressBar />
			<h2 className="text-primary-dark-gray text-2xl font-bold pb-5">
				Loading Products...
			</h2>
		</div>
	);

	const layout = (
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
	);

	const modal = (
		<Modal
			title={'Add Products'}
			isOpen={isOpen}
			onClose={closeModal}
			closeButton
		>
			<ProductForm data={products} onClose={closeModal} />
			{/* <ProductFormTable /> */}
		</Modal>
	);

	return (
		<>
			<LayoutWrapper>
				{!notLoading && loading}
				{notLoading && layout}
				{notLoading && modal}
			</LayoutWrapper>
		</>
	);
};

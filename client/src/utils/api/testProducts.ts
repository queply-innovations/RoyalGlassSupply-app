import { Product, ProductPrices } from '@/entities/Products';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// const API_BASE_URL = 'http://127.0.0.1:8000/api';
// const API_PRODUCT_URL = `${API_BASE_URL}/products`;
// const API_PRODUCT_PRICES_URL = `${API_BASE_URL}/product-prices`;

const MOCK_API_BASE_URL = 'https://65956d2504335332df82b67a.mockapi.io/rgs/api';
const MOCK_API_PRODUCT_URL = `${MOCK_API_BASE_URL}/products`;
const MOCK_API_PRODUCT_PRICES_URL = `${MOCK_API_BASE_URL}/product_prices`;

const fetchProducts = async (): Promise<Product[]> => {
	try {
		await new Promise(resolve => setTimeout(resolve, 100));

		const response = await axios.get(MOCK_API_PRODUCT_URL);

		if (response.data) {
			return response.data as Product[];
		} else {
			throw new Error('Empty response data');
		}
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
};

const fetchProductPrices = async (): Promise<ProductPrices[]> => {
	try {
		await new Promise(resolve => setTimeout(resolve, 100));
		const response = await axios.get(MOCK_API_PRODUCT_PRICES_URL);
		if (response.data) {
			return response.data as ProductPrices[];
		} else {
			throw new Error('Empty response data');
		}
	} catch (error) {
		console.error('Error fetching product prices:', error);
		throw error;
	}
};

const fetchProductsAndPrices = async (): Promise<{
	products: Product[];
	prices: ProductPrices[];
}> => {
	try {
		const productsPromise = fetchProducts();
		const pricesPromise = fetchProductPrices();

		const [products, prices] = await Promise.all([
			productsPromise,
			pricesPromise,
		]);

		return { products, prices };
	} catch (error) {
		console.error('Error fetching products and prices:', error);
		throw error;
	}
};

const combineProductsAndPrices = async () => {
	try {
		const { products, prices } = await fetchProductsAndPrices();

		const combinedArray = products.map(product => {
			const productId = product.id.toString();
			const price = prices.find(
				price => price.product_id.toString() === productId,
			);

			return {
				...product,
				price,
			};
		});

		return combinedArray;
	} catch (error) {
		console.error('Error combining products and prices:', error);
		throw error;
	}
};

combineProductsAndPrices().then(combinedArray => {
	console.log('Combined array:', combinedArray);
});

export const useProductsQuery = () => {
	return useQuery({
		queryKey: ['products'],
		queryFn: () => fetchProducts(),
		refetchOnWindowFocus: false,
	});
};

export const useProductsPricesQuery = () => {
	return useQuery({
		queryKey: ['product_prices'],
		queryFn: () => fetchProductPrices(),
		refetchOnWindowFocus: false,
	});
};

export const useProductsAndPricesQuery = () => {
	return useQuery({
		queryKey: ['ProductsAndPrices'],
		queryFn: () => combineProductsAndPrices(),
		refetchOnWindowFocus: false,
	});
};

export const useProductMutation = (data: Product, os: object) => {
	const queryClient = useQueryClient();
	const invalidateProducts = queryClient.invalidateQueries({
		queryKey: ['products'],
	});

	const onSuccessOptions = {
		...os,
		invalidateProducts,
	};

	const { mutateAsync: addProductMutation } = useMutation({
		mutationKey: ['addProduct', data.id],
		mutationFn: addProduct,
		onSuccess: () => {
			onSuccessOptions;
		},
	});
	return addProductMutation;
};

export const addProduct = (data: Product) => {
	const response = axios.post(MOCK_API_PRODUCT_URL, data);
	return response;
};

export const removeProduct = (id: number) => {
	const response = axios.delete(`${MOCK_API_PRODUCT_URL}/${id}`);
	return response;
};

export const updateProduct = (data: Product) => {
	const response = axios.put(`${MOCK_API_PRODUCT_URL}/${data.id}`, data);
	return response;
};

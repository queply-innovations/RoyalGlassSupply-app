/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from '@/entities/Products';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE_URL = 'https://65956d2504335332df82b67a.mockapi.io/rgs/api';

const fetchProducts = async (query = ''): Promise<Product[]> => {
	await new Promise(resolve => setTimeout(resolve, 100));
	const response = await axios.get(`${API_BASE_URL}/products`);
	console.log('fetched products');
	return response.data;
};
const fetchProductPrices = async (query = ''): Promise<Product[]> => {
	await new Promise(resolve => setTimeout(resolve, 100));
	const response = await axios.get(`${API_BASE_URL}/product_prices`);
	console.log('fetched product prices');
	return response.data;
};

export const useProducts = () => {
	return useQuery({
		queryKey: ['products'],
		queryFn: () => fetchProducts(),
		refetchOnWindowFocus: false,
	});
};

export const useProductsPrices = () => {
	return useQuery({
		queryKey: ['product_prices'],
		queryFn: () => fetchProductPrices(),
		refetchOnWindowFocus: false,
	});
};

// export const useProductsAndPrices = () => {
// 	const { data: productsQuery } = useProducts();

// 	return useQuery({
// 		queryKey: ['productsAndPrices'],
// 		queryFn: async () => {
// 			const products = await productsQuery;

// 			if (products) {
// 				const pricesPromises = products.map(product =>
// 					fetchProductPrices(product.id),
// 				);
// 				const prices = await Promise.all(pricesPromises);

// 				// Combine products with prices
// 				const productsWithPrices = products.map((product, index) => ({
// 					...product,
// 					prices: prices[index],
// 				}));

// 				return productsWithPrices;
// 			}

// 			return [];
// 		},
// 	});
// };

export const addProduct = (data: any) => {
	const response = axios.post(`${API_BASE_URL}/products`, data);
	return response;
};
export const removeProduct = (id: number) => {
	const response = axios.delete(`${API_BASE_URL}/products/${id}`);
	return response;
};
export const updateProduct = (data: any) => {
	const response = axios.delete(`${API_BASE_URL}/products/${data.id}`, data);
	return response;
};

export const addProductPrice = (data: any) => {
	const response = axios.post(`${API_BASE_URL}/product_prices`, data);
	return response;
};
export const removeProductPrice = (id: number) => {
	const response = axios.delete(`${API_BASE_URL}/product_prices/${id}`);
	return response;
};
export const updateProductPrice = (data: any) => {
	const response = axios.delete(
		`${API_BASE_URL}/product_prices/${data.id}`,
		data,
	);
	return response;
};

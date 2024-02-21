import axios from 'axios';
import { API_HEADERS, API_URLS } from '@/api';
import { Product, ProductPrices } from '../types';

export const fetchProducts = async (): Promise<Product[]> => {
	return await axios
		.get(API_URLS.PRODUCTS, {
			headers: API_HEADERS,
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching products:', error);
			throw error;
		});
};

export const fetchProductPrices = async (): Promise<ProductPrices[]> => {
	return await axios
		.get(API_URLS.PRODUCT_PRICES, {
			headers: API_HEADERS,
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching product prices:', error);
			throw error;
		});
};

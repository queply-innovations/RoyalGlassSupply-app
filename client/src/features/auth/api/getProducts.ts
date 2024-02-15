import { API_URLS } from '@/api';
import { Product, ProductPrices } from '@/entities';
import storage from '@/utils/storage';
import axios from 'axios';

export const getProducts = async (): Promise<Product[]> => {
	return axios.get(`${API_URLS.PRODUCTS}`, {
		headers: {
			Authorization: `Bearer ${storage.getToken()}`,
			'Content-Type': 'application/json',
		},
	});
};

export const getProductPrices = async (): Promise<ProductPrices[]> => {
	return axios.get(`${API_URLS.PRODUCT_PRICES}`, {
		headers: {
			Authorization: `Bearer ${storage.getToken()}`,
			'Content-Type': 'application/json',
		},
	});
};
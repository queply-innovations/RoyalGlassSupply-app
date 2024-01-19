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

export const useProducts = () => {
	return useQuery({
		queryKey: ['products'],
		queryFn: () => fetchProducts(),
		refetchOnWindowFocus: false,
	});
};

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

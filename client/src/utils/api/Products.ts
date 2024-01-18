import { Product } from '@/entities/Products';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE_URL = 'https://65956d2504335332df82b67a.mockapi.io/rgs/api';

const fetchProducts = async (query = ''): Promise<Product[]> => {
	await new Promise(resolve => setTimeout(resolve, 100));
	const response = await axios.get(`${API_BASE_URL}/products`);
	console.log('fetched warehouses');
	return response.data;
};

export const useProducts = () => {
	return useQuery({
		queryKey: ['products'],
		queryFn: () => fetchProducts(),
		refetchOnWindowFocus: false,
	});
};

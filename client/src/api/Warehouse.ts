/* eslint-disable @typescript-eslint/no-explicit-any */
import { Warehouse } from '@/entities/Warehouse';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_BASE_URL } from './Url';

const fetchWarehouses = async (): Promise<Warehouse[]> => {
	await new Promise(resolve => setTimeout(resolve, 100));
	const response = await axios.get(`${API_BASE_URL}/Warehouse`);
	console.log('fetched warehouses');
	return response.data;
};

export const useWarehouses = () => {
	return useQuery({
		queryKey: ['warehouses'],
		queryFn: () => fetchWarehouses(),
		refetchOnWindowFocus: false,
	});
};

export const useWarehouseMutation = (selectedWarehouse: any) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['removeWarehouse:', selectedWarehouse],
		mutationFn: removeWarehouse,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['warehouses'] });
			console.log('Warehouse removed');
		},
		onError: error => {
			console.error('Warehouse Data submission failed', error);
		},
	});
};

export const getWarehouseById = (data: any[], id: number) => {
	const warehouse = data.find(warehouse => warehouse.id === id);
	return warehouse;
};
export const addWarehouse = (data: any) => {
	const response = axios.post(`${API_BASE_URL}/Warehouse`, data);
	return response;
};

export const removeWarehouse = (id: number) => {
	const response = axios.delete(`${API_BASE_URL}/Warehouse/${id}`);
	return response;
};

export const updateWarehouse = (data: any) => {
	const response = axios.put(`${API_BASE_URL}/Warehouse/${data.id}`, data);
	return response;
};
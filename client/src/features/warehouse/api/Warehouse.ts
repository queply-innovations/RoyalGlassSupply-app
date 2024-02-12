import axios from 'axios';
import { Warehouse } from '@/entities/Warehouse';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URLS } from '@/api';
import storage from '@/utils/storage';

export const useWarehouses = () => {
	return useQuery({
		queryKey: ['warehouses'],
		queryFn: () => fetchWarehouses(),
		refetchOnWindowFocus: false,
	});
};

export const fetchWarehouses = async (): Promise<Warehouse[]> => {
	return axios.get(`${API_URLS.WAREHOUSE}`, {
		headers: {
			Authorization: `Bearer ${storage.getToken()}`,
			'Content-Type': 'application/json',
		},
	});
};

export const getWarehouses = () => {
	return axios.get(`${API_BASE_URL}/Warehouse`);
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Warehouse } from '@/entities/Warehouse';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE_URL = 'https://65956d2504335332df82b67a.mockapi.io/rgs/api';

const fetchWarehouses = async (query = ''): Promise<Warehouse[]> => {
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

export const getNextId = (data: any[] | undefined) => {
	if (!data || data.length === 0) {
		return 1;
	} else {
		const highestId = Math.max(...data.map((warehouse: any) => warehouse.id));
		return highestId + 1;
	}
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

// export const TestaddWarehouse = async (data: any[]): Promise<Warehouse> => {
// 	await new Promise(resolve => setTimeout(resolve, 100));

// 	const newWarehouse = {
// 		id: data.id.length + 1,
// 		warehouse_name: data.warehouse_name,
// 		warehouse_location: data.warehouse_location,
// 	};
// };
// axios
// 				.get(
// 					'https://65956d2504335332df82b67a.mockapi.io/rgs/api/Warehouse',
// 				)
// 				.then(data => {
// 					console.log(data);
// 					return data;
// 				}),

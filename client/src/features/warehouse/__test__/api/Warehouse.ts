import axios from 'axios';
import storage from '@/utils/storage';
import { Warehouse } from '@/entities/Warehouse';
import { API_URLS } from '@/api';

export const fetchWarehouses = async (): Promise<Warehouse[]> => {
	return axios.get(`${API_URLS.WAREHOUSE}`, {
		headers: {
			Authorization: `Bearer ${storage.getToken()}`,
			'Content-Type': 'application/json',
		},
	});
};

export const getWarehouses = () => {
	return axios.get(`${API_URLS.WAREHOUSE}`);
};

export const getWarehouseById = (data: Warehouse[], id: number) => {
	const warehouse = data.find(warehouse => warehouse.id === id);
	return warehouse;
};

export const addWarehouse = (data: Warehouse) => {
	const response = axios.post(`${API_URLS.WAREHOUSE}`, data);
	return response;
};

export const updateWarehouse = (data: Warehouse) => {
	const response = axios.put(`${API_URLS.WAREHOUSE}/${data.id}`, data);
	return response;
};

export const removeWarehouse = (id: number) => {
	const response = axios.delete(`${API_URLS.WAREHOUSE}/${id}`);
	return response;
};

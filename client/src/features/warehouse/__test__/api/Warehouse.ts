import axios from 'axios';
import storage from '@/utils/storage';
import { API_URLS } from '@/api';
import { Warehouse } from '../types';

export const fetchWarehouses = async (): Promise<Warehouse[]> => {
	try {
		const response = await axios.get(API_URLS.WAREHOUSE, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
		});
		return response.data.data;
	} catch (error) {
		console.error('Error fetching warehouses:', error);
		throw error;
	}
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

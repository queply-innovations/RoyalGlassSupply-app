import axios from 'axios';
import storage from '@/utils/storage';
import { API_HEADERS, API_URLS } from '@/api';
import { Warehouse } from '../types';

export const fetchWarehouses = async (): Promise<Warehouse[]> => {
	return await axios
		.get(API_URLS.WAREHOUSES, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching warehouses:', error);
			throw error;
		});
};

export const getWarehouses = () => {
	return axios.get(`${API_URLS.WAREHOUSES}`);
};

export const getWarehouseById = (data: Warehouse[], id: number) => {
	const warehouse = data.find(warehouse => warehouse.id === id);
	return warehouse;
};

export const addWarehouse = (data: Warehouse) => {
	return axios
		.post(API_URLS.WAREHOUSES, data, {
			headers: API_HEADERS,
		})
		.then(response => {
			return response.data;
		})
		.catch(error => {
			console.error('Error adding warehouse:', error);
			throw error;
		});
};

export const updateWarehouse = (data: Warehouse) => {
	return axios
		.put(`${API_URLS.WAREHOUSES}/${data.id}`, data, {
			headers: API_HEADERS,
		})
		.then(response => {
			return response.data;
		})
		.catch(error => {
			console.error('Error updating warehouse:', error);
			throw error;
		});
};

export const removeWarehouse = (id: number) => {
	return axios
		.delete(`${API_URLS.WAREHOUSES}/${id}`, {
			headers: API_HEADERS,
		})
		.then(response => {
			return response.data;
		})
		.catch(error => {
			console.error('Error removing warehouse:', error);
			throw error;
		});
};

import axios from 'axios';
import storage from '@/utils/storage';
import { API_HEADERS, API_URLS } from '@/api';
import { Warehouse } from '../types';
// import { ToastContainer, toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";

export const fetchWarehouses = async (updateProgress: any): Promise<Warehouse[]> => {
	return await axios
		.get(API_URLS.WAREHOUSE, {
			headers: API_HEADERS(),
			onDownloadProgress: (progress) => {
				if (progress.total) {
					let percentCompleted = Math.round((progress.loaded / progress.total) * 100);
					updateProgress(percentCompleted);
				}
			},
		})
		.then(response => {
			setTimeout(() => {updateProgress(100)}, 2000);
			return response.data.data;
		})
		.catch((error: Error) => {
			console.error('Error fetching warehouses:', error.message);
			throw error;
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
	return axios
		.post(API_URLS.WAREHOUSE, data, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return response.data;
		})
		.catch((error: Error) => {
			console.error('Error adding warehouses:', error.message);
			throw error;
		});
};

export const updateWarehouse = (data: Warehouse) => {
	return axios
		.put(`${API_URLS.WAREHOUSE}/${data.id}`, data, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return response.data;
		})
		.catch((error: Error) => {
			console.error('Error updating warehouses:', error.message);
			throw error;
		});
};

export const removeWarehouse = (id: number) => {
	return axios
		.delete(`${API_URLS.WAREHOUSE}/${id}`, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return response.data;
		})
		.catch((error: Error) => {
			console.error('Error removing warehouses:', error.message);
			throw error;
		});
};

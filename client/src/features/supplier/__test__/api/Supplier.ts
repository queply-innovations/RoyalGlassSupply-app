import axios from 'axios';
import storage from '@/utils/storage';
import { API_URLS } from '@/api';
import { Supplier } from '../../types';

export const fetchSuppliers = async (updateProgress: any): Promise<Supplier[]> => {
	return await axios
		.get(API_URLS.SUPPLIERS, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
			// onDownloadProgress: (progress) => {
			// 	let percentCompleted = Math.round((progress.loaded / progress.total) * 100);
			// 	updateProgress(percentCompleted);
			// },
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching suppliers:', error);
			throw error;
		});
};

export const addSupplier = async (data: Supplier) => {
	return await axios
		.post(`${API_URLS.SUPPLIERS}`, data, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error adding supplier:', error);
			throw error;
		});
};

export const updateSupplier = async (data: Supplier) => {
	return await axios
		.put(`${API_URLS.SUPPLIERS}/${data.id}`, data, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error editing supplier:', error);
			throw error;
		});
};

// export const removeSupplier = (id: number) => {
// 	const response = axios.delete(`${API_URLS.SUPPLIERS}/${id}`);
// 	return response;
// };

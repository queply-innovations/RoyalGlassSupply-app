import axios from 'axios';
import storage from '@/utils/storage';
import { API_URLS } from '@/api';
import { Supplier } from '../../types';

export const fetchSuppliers = async (): Promise<Supplier[]> => {
	return await axios
		.get(API_URLS.SUPPLIERS, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching suppliers:', error);
			throw error;
		});
};

export const addSupplier = (data: Supplier) => {
	const response = axios.post(`${API_URLS.SUPPLIERS}`, data);
	return response;
};

export const updateSupplier = (data: Supplier) => {
	const response = axios.put(`${API_URLS.SUPPLIERS}/${data.id}`, data);
	return response;
};

export const removeSupplier = (id: number) => {
	const response = axios.delete(`${API_URLS.SUPPLIERS}/${id}`);
	return response;
};

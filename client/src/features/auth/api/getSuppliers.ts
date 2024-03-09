import { API_URLS } from '@/api';
import { Supplier } from '@/entities';
import storage from '@/utils/storage';
import axios from 'axios';

export const getSuppliers = async (): Promise<Supplier[]> => {
	return axios.get(`${API_URLS.SUPPLIERS}`, {
		headers: {
			Authorization: `Bearer ${storage.getToken()}`,
			'Content-Type': 'application/json',
		},
	});
};
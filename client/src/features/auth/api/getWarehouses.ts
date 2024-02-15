import { API_URLS } from '@/api';
import { Warehouse } from '@/entities';
import storage from '@/utils/storage';
import axios from 'axios';

export const getWarehouses = async (): Promise<Warehouse[]> => {
	return axios.get(`${API_URLS.WAREHOUSES}`, {
		headers: {
			Authorization: `Bearer ${storage.getToken()}`,
			'Content-Type': 'application/json',
		},
	});
};

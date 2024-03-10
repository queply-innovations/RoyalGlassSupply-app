import axios from 'axios';
import { API_HEADERS, API_URLS } from '@/api';
import { Inventory } from '../types';

export const fetchInventory = async (): Promise<Inventory[]> => {
	return await axios
		.get(API_URLS.INVENTORY, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching inventory:', error);
			throw error;
		});
};

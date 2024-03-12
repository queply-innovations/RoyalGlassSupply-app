import axios from 'axios';
import { API_HEADERS, API_URLS } from '@/api';
import { Inventory, InventoryProduct, InventoryDatabase } from '../types';

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

export const fetchInventoryProducts = async (): Promise<InventoryProduct[]> => {
	return await axios
		.get(API_URLS.INVENTORY_PRODUCTS, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching inventory products:', error);
			throw error;
		});
};

export const fetchInventoryProductById = async (
	inventory_id: number,
): Promise<InventoryProduct[]> => {
	return await axios
		.post(
			`${API_URLS.INVENTORY_PRODUCTS}/searches-filters-sorts`,
			{ inventory_id: JSON.stringify(inventory_id) },
			{
				headers: API_HEADERS(),
			},
		)
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching inventory product by id:', error);
			throw error;
		});
};

export const addInventory = async (
	data: Partial<Omit<InventoryDatabase, 'id'>>,
) => {
	return await axios
		.post(API_URLS.INVENTORY, data, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return { status: response.status, data: response.data };
		})
		.catch(error => {
			console.error('Error adding inventory:', error);
			throw error;
		});
};

export const patchInventory = async ({
	id,
	data,
}: {
	id: number;
	data: Partial<Omit<InventoryDatabase, 'id'>>;
}) => {
	return await axios
		.patch(`${API_URLS.INVENTORY}/${id}`, data, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return { status: response.status, data: response.data };
		})
		.catch(error => {
			return error.response
				? {
						status: error.response.status as number,
						data: error.response.data,
					}
				: error;
		});
};

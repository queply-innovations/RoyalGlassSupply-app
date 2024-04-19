import axios from 'axios';
import { API_HEADERS, API_URLS } from '@/api';
import {
	Inventory,
	InventoryDatabase,
	InventoryProduct,
	InventoryProductDatabase,
} from '../types';

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

export const fetchInventoryById = async (id: number): Promise<Inventory> => {
	return await axios
		.get(`${API_URLS.INVENTORY}/${id}`, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching inventory by id:', error);
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

export const fetchInventoryByWarehouseId = async (
	warehouse_id: number,
): Promise<Inventory[]> => {
	return await axios
		.post(
			`${API_URLS.INVENTORY}/searches-filters-sorts`,
			{
				filter: {
					warehouse_id: warehouse_id,
				},
			},
			{
				headers: API_HEADERS(),
			},
		)
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error(
				'Error fetching inventory products by warehouse id:',
				error,
			);
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

export const fetchInventoryProductByWarehouseId = async (
	id: number,
): Promise<InventoryProduct[]> => {
	return await axios
		.post(
			`${API_URLS.INVENTORY_PRODUCTS}/warehouse/searches-filters-sorts-by-warehouse`,
			{ warehouse_id: id },
			{
				headers: API_HEADERS(),
			},
		)
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error(
				'Error fetching inventory product by warehouse id:',
				error,
			);
			throw error;
		});
};

export const fetchPendingInventoryProducts = async (): Promise<
	InventoryProduct[]
> => {
	return await axios
		.post(
			`${API_URLS.INVENTORY_PRODUCTS}/searches-filters-sorts`,
			{ status: 0 },
			{
				headers: API_HEADERS(),
			},
		)
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching pending inventory product:', error);
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

export const addInventoryProduct = async (
	data: Partial<InventoryProductDatabase>,
) => {
	return await axios
		.post(API_URLS.INVENTORY_PRODUCTS, data, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return { status: response.status, data: response.data };
		})
		.catch(error => {
			console.error('Error adding inventory product:', error);
			throw error;
		});
};

export const addInventoryProducts = async (
	data: Partial<InventoryProductDatabase>[],
) => {
	return Promise.all(
		data.map(async (inventoryProduct: Partial<InventoryProductDatabase>) => {
			return await axios
				.post(API_URLS.INVENTORY_PRODUCTS, inventoryProduct, {
					headers: API_HEADERS(),
				})
				.then(response => {
					return { status: response.status, data: response.data };
				})
				.catch(error => {
					console.error('Error adding inventory product:', error);
					throw error;
				});
		}),
	)
		.then(responses => {
			let status = responses.map(response => response.status);
			return status;
		})
		.catch(error => {
			console.error('Error adding inventory products:', error);
			throw error;
		});
};

export const patchInventoryProduct = async ({
	id,
	data,
}: {
	id: number;
	data: Partial<InventoryProductDatabase>;
}) => {
	return await axios
		.patch(`${API_URLS.INVENTORY_PRODUCTS}/${id}`, data, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return { status: response.status, data: response.data };
		})
		.catch(error => {
			console.error('Error updating inventory product:', error);
			throw error;
		});
};

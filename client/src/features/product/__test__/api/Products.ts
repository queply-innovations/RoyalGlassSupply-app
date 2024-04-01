import axios from 'axios';
import { API_HEADERS, API_URLS } from '@/api';
import { Product, ProductPrices, ProductPricesDatabase } from '../types';

export const fetchProducts = async (): Promise<Product[]> => {
	return await axios
		.get(API_URLS.PRODUCTS, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching products:', error);
			throw error;
		});
};

export const fetchProductPrices = async (): Promise<ProductPrices[]> => {
	return await axios
		.get(API_URLS.PRODUCT_PRICES, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching product prices:', error);
			throw error;
		});
};

export const fetchApprovedProductPrices = async (): Promise<
	ProductPrices[]
> => {
	return await axios
		.post(
			`${API_URLS.PRODUCT_PRICES}/searches-filters-sorts`,
			{
				filter: {
					approval_status: 'approved',
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
			console.error('Error fetching approved product prices:', error);
			throw error;
		});
};

export const fetchProductPricesFilters = async (
	approval_status?: string,
	warehouse_id?: number,
): Promise<ProductPrices[]> => {
	const filters: any = {};
	if (approval_status) {
		filters['approval_status'] = approval_status;
	}
	if (warehouse_id) {
		filters['warehouse_id'] = warehouse_id;
	}

	return await axios
		.post(
			`${API_URLS.PRODUCT_PRICES}/searches-filters-sorts`,
			{
				filter: filters,
			},
			{
				headers: API_HEADERS(),
			},
		)
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching approved product prices:', error);
			throw error;
		});
};

export const fetchApprovedProductPricesFilterByWarehouse = async (
	id: number,
): Promise<ProductPrices[]> => {
	return await axios
		.post(
			`${API_URLS.PRODUCT_PRICES}/searches-filters-sorts`,
			{
				filter: {
					approval_status: 'approved',
					warehouse_id: id,
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
			console.error('Error fetching approved product prices:', error);
			throw error;
		});
};

export const addProduct = async (data: Omit<Partial<Product>, 'id'>) => {
	return await axios
		.post(API_URLS.PRODUCTS, data, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return { status: response.status, data: response.data };
		})
		.catch(error => {
			console.error('Error adding product:', error);
			throw error;
		});
};

export const patchProduct = async ({
	id,
	data,
}: {
	id: number;
	data: Omit<Partial<Product>, 'id'>;
}) => {
	return await axios
		.patch(`${API_URLS.PRODUCTS}/${id}`, data, {
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
				: error.request
					? { status: 500, data: error.request }
					: { status: 500, data: error.message };
		});
};

export const addProductListing = async (
	data: Omit<
		Partial<ProductPricesDatabase>,
		'id' | 'created_at' | 'updated_at'
	>,
) => {
	return await axios
		.post(API_URLS.PRODUCT_PRICES, data, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return { status: response.status, data: response.data };
		})
		.catch(error => {
			console.error('Error adding product listing:', error);
			throw error;
		});
};

export const updateProductListing = async ({
	id,
	data,
}: {
	id: number;
	data: Omit<ProductPricesDatabase, 'id' | 'created_at' | 'updated_at'>;
}) => {
	return await axios
		.put(`${API_URLS.PRODUCT_PRICES}/${id}`, data, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return { status: response.status, data: response.data };
		})
		.catch(error => {
			console.error('Error updating product listing:', error);
			throw error;
		});
};

export const patchProductListing = async ({
	id,
	data,
}: {
	id: number;
	data: Omit<
		Partial<ProductPricesDatabase>,
		'id' | 'created_at' | 'updated_at'
	>;
}) => {
	return await axios
		.patch(`${API_URLS.PRODUCT_PRICES}/${id}`, data, {
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
				: error.request
					? { status: 500, data: error.request }
					: { status: 500, data: error.message };
		});
};

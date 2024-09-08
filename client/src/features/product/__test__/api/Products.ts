import axios from 'axios';
import { API_HEADERS, API_URLS } from '@/api';
import {
	Product,
	ProductPrices,
	ProductPricesDatabase,
	ProductPricesPaginated,
} from '../types';

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

export const fetchPendingProductPrices = async (): Promise<ProductPrices[]> => {
	return await axios
		.post(
			`${API_URLS.PRODUCT_PRICES}/searches-filters-sorts`,
			{
				filter: {
					approval_status: 'pending',
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
			console.error('Error fetching pending product prices:', error);
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
	// approval_status?: string, //TODO Possible to comment out
	warehouse_id?: number,
): Promise<ProductPrices[]> => {
	return await axios
		.post(
			`${API_URLS.PRODUCT_PRICES}/searches-filters-sorts`,
			{
				filter: {
					// approval_status: approval_status, //TODO Possible to comment out
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

export const isProductDeletable = async (id: number) => {
	return await axios
		.all([
			axios.post(
				`${API_URLS.PRODUCT_PRICES}/searches-filters-sorts`,
				{
					filter: {
						product_id: id,
					},
				},
				{
					headers: API_HEADERS(),
				},
			),
			axios.post(
				`${API_URLS.INVENTORY_PRODUCTS}/searches-filters-sorts`,
				{
					filter: {
						product_id: id,
					},
				},
				{
					headers: API_HEADERS(),
				},
			),
		])
		.then(
			axios.spread((productPrices, inventoryProducts) => {
				return (
					productPrices.data.data.length === 0 &&
					inventoryProducts.data.data.length === 0
				);
			}),
		)
		.catch(error => {
			console.error('Error checking if product is deletable:', error);
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

export const deleteProduct = async (id: number) => {
	return await axios
		.delete(`${API_URLS.PRODUCTS}/${id}`, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return { status: response.status, data: response.data };
		})
		.catch(error => {
			console.error('Error deleting product:', error);
			throw error;
		});
};

export const fetchProductPricesByDateRange = async (
	dateFrom: Date,
	dateTo: Date,
): Promise<ProductPrices[]> => {
	return await axios
		.post(
			`${API_URLS.PRODUCT_PRICES}/searches-filters-sorts`,
			{
				date_range: {
					created_at: {
						from: dateFrom.toISOString().split('T')[0],
						to: dateTo.toISOString().split('T')[0],
					},
				},
			},
			{ headers: API_HEADERS() },
		)
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching reports:', error);
			return error;
		});
};

export const deleteProductListing = async (id: number) => {
	return await axios
		.delete(`${API_URLS.PRODUCT_PRICES}/${id}`, {
			headers: API_HEADERS(),
		})
		.then(response => ({ message: response.data.message }))
		.catch(error => {
			console.error('Error deleting product listing:', error);
			throw error;
		});
};

export const fetchProductPricesPaginated = async (
	page: number,
	pageSize: number = 10,
): Promise<ProductPricesPaginated> => {
	return await axios
		.get(
			`https://staging.royalglasssupply.com/api/test/product-prices?page=${page}&pageSize=${pageSize}`,
			{ headers: API_HEADERS() },
		)
		.then(response => {
			return response.data;
		})
		.catch(error => {
			console.error('Error fetching paginated product prices:', error);
			throw error;
		});
};

export const fetchProductPricesPOS = async ({
	page,
	pageSize = 100,
	warehouse_id = 0, // warehouse_id: 0 responds with no data
}: {
	page: number;
	pageSize?: number;
	warehouse_id?: number;
}): Promise<ProductPricesPaginated> => {
	return await axios
		.post(
			`${API_URLS.PRODUCT_PRICES}/searches-filters-sorts?page=${page}&pageSize=${pageSize}`,
			{ filter: { warehouse_id: warehouse_id } },
			{
				headers: API_HEADERS(),
			},
		)
		.then(response => {
			return response.data;
		})
		.catch(error => {
			console.error('Error fetching product prices:', error);
			throw error;
		});
};

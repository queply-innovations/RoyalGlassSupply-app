import { API_HEADERS, API_URLS } from '@/api';
import storage from '@/utils/storage';
import axios from 'axios';
import {
	Transfer,
	TransferAdd,
	TransferEdit,
	TransferProduct,
	TransferProductFull,
} from '../types';
import { useState } from 'react';

export const fetchTransfers = async (
	updateProgress: any,
): Promise<Transfer[]> => {
	return await axios
		.get(API_URLS.TRANSFER, {
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
			console.error('Error fetching transfer:', error);
			throw error;
		});
};

export const fetchPendingTransfers = async (): Promise<Transfer[]> => {
	return await axios
		.post(
			`${API_URLS.TRANSFER}/searches-filters-sorts`,
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
			console.error('Error fetching pending transfers:', error);
			throw error;
		});
};

export const addTransfer = async (data: TransferAdd) => {
	try {
		const response = await axios.post(API_URLS.TRANSFER, data, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				Accept: 'application/json',
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error adding transfer:', error);
		throw error;
	}
};

export const editTransfer = async (data: TransferEdit) => {
	try {
		const response = await axios
			.put(
				`${API_URLS.TRANSFER}/${data.id}?approval_status=${data?.approval_status}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${storage.getToken()}`,
						'Content-Type': 'application/json',
					},
				},
			)
			.then(response => {
				return response.data;
			});
	} catch (error) {
		console.error('Error editing transfer:', error);
		throw error;
	}
};

export const fetchTransferProducts = async (): Promise<
	TransferProductFull[]
> => {
	return await axios
		.get(API_URLS.TRANSFER_PRODUCTS, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching transfer products:', error);
			throw error;
		});
};

export const addTransferProduct = async (
	data: TransferProduct,
): Promise<TransferProduct[]> => {
	return await axios
		.post(API_URLS.TRANSFER_PRODUCTS, data, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error adding transfer product:', error);
			throw error;
		});
};

export const editTransferProduct = async (
	data: TransferProduct,
): Promise<TransferProduct[]> => {
	return await axios
		.put(`${API_URLS.TRANSFER_PRODUCTS}/${data.id}`, data, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error editing transfer product:', error);
			throw error;
		});
};

export const addInventory = async (data: any) => {
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

async function secondResponseParsing(
	data: any,
	inventoryID: number,
	transferProduct: TransferProductFull,
) {
	try {
		const addInvProd = {
			inventory_id: inventoryID,
			product_id: transferProduct.product.id,
			supplier_id: data.supplier_id.id,
			capital_price: transferProduct.capital_price,
			bundles_count: transferProduct.bundles_count,
			bundles_unit: transferProduct.bundles_unit,
			quantity_per_bundle: transferProduct.quantity_per_bundle,
			stocks_count: transferProduct.total_quantity,
			damage_count: data.damage_count,
			total_count: transferProduct.total_quantity,
			unit: transferProduct.unit,
		};

		async function secondStepParsing() {
			return await axios
				.post(API_URLS.INVENTORY_PRODUCTS, addInvProd, {
					//ADD INVENTORY PRODUCT
					headers: API_HEADERS(),
				})
				.then(response => {
					return { status: response.status, data: response.data };
				})
				.catch(error => {
					console.error('Error adding inventory product:', error);
					throw error;
				});
		}

		secondStepParsing();
	} catch (error) {
		console.error('Error updating inventory product:', error);
		throw error;
	}
}

export const updateAddTrfInvProducts = async (
	data: TransferProductFull[],
	inventoryID: number,
) => {
	return Promise.all(
		data.map(async (transferProduct: TransferProductFull) => {
			const id = transferProduct.source_inventory;
			return await axios
				.get(`${API_URLS.INVENTORY_PRODUCTS}/${id}`, {
					//GET ORIGINAL INVENTORY PRODUCT
					headers: API_HEADERS(),
				})
				.then(async response => {
					secondResponseParsing(
						response.data.data,
						inventoryID,
						transferProduct,
					);
				})
				.catch(error => {
					console.error('Error getting inventory product:', error);
					throw error;
				});
		}),
	)

		.then(responses => {
			let status = responses.map(response => response);
			return status;
		})

		.catch(error => {
			console.error('Error parsing inventory products:', error);
			throw error;
		});
};

export const initInventoryProduct = async (data: TransferProductFull[]) => {
	return Promise.all(
		data.map(async (transferProduct: TransferProductFull) => {
			const id = transferProduct.id;
			const trfProduct = {
				total_quantity: 0,
				bundles_count: 0,
				quantity_per_bundle: 0,
			};
			return await axios
				.patch(`${API_URLS.TRANSFER_PRODUCTS}/${id}`, trfProduct, {
					//EDIT TRANSFER PRODUCT
					headers: API_HEADERS(),
				})
				.then(async response => {
					return response;
				})
				.catch(error => {
					console.error('Error getting transfer product:', error);
					throw error;
				});
		}),
	)

		.then(responses => {
			let status = responses.map(response => response);
			return status;
		})

		.catch(error => {
			console.error('Error parsing inventory products:', error);
			throw error;
		});
};

import { API_HEADERS, API_URLS } from '@/api';
import storage from '@/utils/storage';
import axios from 'axios';
import { Transfer, TransferAdd, TransferEdit } from '../types';

export const fetchTransfers = async (updateProgress: any): Promise<Transfer[]> => {
	return await axios
		.get(API_URLS.TRANSFER, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
			onDownloadProgress: (progress) => {
				let percentCompleted = Math.round((progress.loaded / progress.total) * 100);
				updateProgress(percentCompleted);
			},
		})
		.then(response => {
			console.log(response.data.data);
			return response.data.data.filter((transfer: Transfer) => transfer.approval_status.toString() === 'pending');
		})
		.catch(error => {
			console.error('Error fetching transfer:', error);
			throw error;
		});
};

export const addTransfer = async (data: TransferAdd) => {
	try {
		const response = await axios
			.post(API_URLS.TRANSFER, data, {
				headers: {
					Authorization: `Bearer ${storage.getToken()}`,
					'Accept': 'application/json',
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
			.put(`${API_URLS.TRANSFER}/${data.id}`, data, {
				headers: {
					Authorization: `Bearer ${storage.getToken()}`,
					'Content-Type': 'application/json',
				},
			});
		return response.data;
	} catch (error) {
		console.error('Error editing transfer:', error);
		throw error;
	}
};
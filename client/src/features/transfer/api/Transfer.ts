import { API_HEADERS, API_URLS } from '@/api';
import storage from '@/utils/storage';
import axios from 'axios';
import { Transfer } from '../types';

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
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching users:', error);
			throw error;
		});
};
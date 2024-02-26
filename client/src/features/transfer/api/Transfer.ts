import { API_HEADERS, API_URLS } from '@/api';
import { User } from '@/entities';
import storage from '@/utils/storage';
import axios from 'axios';
import { Transfer } from '../types';

export const fetchTransfers = async (): Promise<Transfer[]> => {
	return await axios
		.get(API_URLS.TRANSFER, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
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
import axios from 'axios';
import { API_HEADERS, API_URLS } from '@/api';
import storage from '@/utils/storage';
import { Expenses, ExpensesRaw } from '../types';

export const fetchExpenses = async (): Promise<ExpensesRaw[]> => {
	return await axios
		.get(API_URLS.EXPENSES, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching expenses:', error);
			throw error;
		});
};

export const addExpenses = async (data: Expenses): Promise<Expenses> => {
	return await axios
		.post(API_URLS.EXPENSES, data, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error adding expenses:', error);
			throw error;
		});
};

export const editExpenses = async (data: Expenses): Promise<Expenses[]> => {
	return await axios
		.put(`${API_URLS.EXPENSES}/${data.id}`, data, {
			headers: {
				Authorization: `Bearer ${storage.getToken()}`,
				'Content-Type': 'application/json',
			},
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error editing expenses:', error);
			throw error;
		});
};
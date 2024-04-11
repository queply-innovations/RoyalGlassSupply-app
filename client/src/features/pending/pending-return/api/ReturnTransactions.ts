import { API_URLS, API_HEADERS } from "@/api";
import axios from "axios";
import { ReturnTransactions, ReturnTransactionsRaw } from "../types";

export const fetchReturnTransactions = async (): Promise<ReturnTransactionsRaw[]> => {
	return await axios
		.get(API_URLS.RETURN_TRANSACTIONS, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error fetching return transactions:', error);
			throw error;
		});
};

export const fetchPendingReturnTransactions = async (): Promise<ReturnTransactionsRaw[]> => {
	return await axios
		.post(
			`${API_URLS.RETURN_TRANSACTIONS}/searches-filters-sorts`,
			{
				filter: {
					refund_status: 'pending',
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
			console.error('Error fetching pending return transactions:', error);
			throw error;
		});
};

export const editReturnTransactions = async (data: ReturnTransactions) => {
	return await axios
		.put(`${API_URLS.RETURN_TRANSACTIONS}/${data.id}`, data, {
			headers: API_HEADERS(),
		})
		.then(response => {
			return response.data.data;
		})
		.catch(error => {
			console.error('Error editing return transactions:', error);
			throw error;
		});
};
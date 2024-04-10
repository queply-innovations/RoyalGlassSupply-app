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
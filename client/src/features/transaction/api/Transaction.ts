import { API_URLS } from "@/api";
import storage from "@/utils/storage";
import axios from "axios";
import { Transaction } from "../types";

export const fetchTransactions = async (updateProgress: any): Promise<Transaction[]> => {
	return await axios
		.get(API_URLS.TRANSACTION, {
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
			console.error('Error fetching transactions:', error);
			throw error;
		});
};
import { API_HEADERS, API_URLS } from '@/api';
import axios from 'axios';
import { Voucher } from '../types';

export const fetchVouchersByCustomerId = async (
	customerId: number,
): Promise<Voucher[]> => {
	return await axios
		.post(
			`${API_URLS.VOUCHERS}/searches-filters-sorts`,
			{
				filter: {
					customer_id: customerId,
					is_claimed: 0,
				},
			},
			{ headers: API_HEADERS() },
		)
		.then(response => {
			return response.data.data;
		})
		.catch((error: Error) => {
			console.error('Error fetching vouchers:', error.message);
			throw error;
		});
};

export const setVoucherClaimed = async (voucherId: number): Promise<void> => {
	return await axios
		.put(
			`${API_URLS.VOUCHERS}/${voucherId}`,
			{
				is_claimed: 1,
			},
			{ headers: API_HEADERS() },
		)
		.then(() => {
			return;
		})
		.catch((error: Error) => {
			console.error('Error setting voucher claimed:', error.message);
			throw error;
		});
};

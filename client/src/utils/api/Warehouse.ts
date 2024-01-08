import { Warehouse } from '@/entities/Warehouse';
import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

const API_BASE_URL = 'https://65956d2504335332df82b67a.mockapi.io/rgs/api';

export const fetchWarehouses = async (query = ''): Promise<Warehouse[]> => {
	await new Promise(resolve => setTimeout(resolve, 100));
	console.log('fetched warehouses');
	const response = await axios.get(`${API_BASE_URL}/Warehouse`);
	return response.data;
};

export const useWarehouses = () => {
	return useQuery({
		queryKey: ['warehouses'],
		queryFn: () => fetchWarehouses(),
	});
};

export const getNextId = (data: any[] | undefined) => {
	if (!data || data.length === 0) {
		return 1;
	} else {
		const highestId = Math.max(...data.map((warehouse: any) => warehouse.id));
		console.log(highestId);
		return highestId + 1;
	}
};

export const addWarehouse = (data: any) => {
	const response = axios.post(`${API_BASE_URL}/Warehouse`, data);
	return response;
};
// axios
// 				.get(
// 					'https://65956d2504335332df82b67a.mockapi.io/rgs/api/Warehouse',
// 				)
// 				.then(data => {
// 					console.log(data);
// 					return data;
// 				}),

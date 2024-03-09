/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Supplier } from '@/entities/Supplier';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const fetchSupplier = async (query = ''): Promise<Supplier[]> => {
	await new Promise(resolve => setTimeout(resolve, 100));
	const response = await axios.get(`${API_BASE_URL}/suppliers`);
	console.log('fetched Supplier');
	return response.data;
};

export const useSupplier = () => {
	return useQuery({
		queryKey: ['supplier'],
		queryFn: () => fetchSupplier(),
		refetchOnWindowFocus: false,
	});
};

export const useSupplierMutation = (selectedSupplier: any) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['removeSupplier:', selectedSupplier],
		mutationFn: removeSupplier,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['supplier'] });
			console.log('Supplier removed');
		},
		onError: error => {
			console.error('Supplier Data submission failed', error);
		},
	});
};

export const getSupplierById = (data: any[], id: number) => {
	const supplier = data.find(Supplier => Supplier.id === id);
	return supplier;
};
export const addSupplier = (data: any) => {
	const response = axios.post(`${API_BASE_URL}/supplier`, data);
	return response;
};

export const removeSupplier = (id: number) => {
	const response = axios.delete(`${API_BASE_URL}/supplier/${id}`);
	return response;
};

export const updateSupplier = (data: any) => {
	const response = axios.put(`${API_BASE_URL}/supplier/${data.id}`, data);
	return response;
};

// export const TestaddSupplier = async (data: any[]): Promise<Supplier> => {
// 	await new Promise(resolve => setTimeout(resolve, 100));

// 	const newSupplier = {
// 		id: data.id.length + 1,
// 		Supplier_name: data.Supplier_name,
// 		Supplier_location: data.Supplier_location,
// 	};
// };
// axios
// 				.get(
// 					'https://65956d2504335332df82b67a.mockapi.io/rgs/api/Supplier',
// 				)
// 				.then(data => {
// 					console.log(data);
// 					return data;
// 				}),

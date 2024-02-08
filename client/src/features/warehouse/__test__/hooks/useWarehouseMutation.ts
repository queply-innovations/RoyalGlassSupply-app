import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeWarehouse } from '../api/Warehouse';

export const useWarehouseMutation = (selectedWarehouse: number) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['removeWarehouse:', selectedWarehouse],
		mutationFn: removeWarehouse,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['warehouses'] });
			console.log('Warehouse removed');
		},
		onError: error => {
			console.error('Warehouse Data submission failed', error);
		},
	});
};

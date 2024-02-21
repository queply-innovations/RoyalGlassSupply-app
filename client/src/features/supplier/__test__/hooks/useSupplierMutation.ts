import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeSupplier } from '../api/Supplier';

export const useSupplierMutation = (selectedSupplier: number) => {
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

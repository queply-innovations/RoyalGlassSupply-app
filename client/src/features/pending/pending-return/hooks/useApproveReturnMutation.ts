import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setReturnApproval } from '../api/ReturnTransactions';

export const useApproveReturnMutation = () => {
	const queryClient = useQueryClient();

	const mutationConfig = {
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				predicate: query => {
					return ['returns', 'pending_returns'].includes(
						query.queryKey[0] as string,
					);
				},
			});
		},
		onError: (error: Error) => {
			console.error('Approve Return failed', error.message);
		},
	};

	const { mutateAsync: approveReturnMutation } = useMutation({
		mutationKey: ['approve_return'],
		mutationFn: setReturnApproval,
		...mutationConfig,
	});

	return {
		approveReturnMutation,
	};
};

import { useQuery } from '@tanstack/react-query';
import { fetchReturnItemsByReturnId } from '../api/Returns';

export const useReturnItemsQuery = (returnTransactionId: number) => {
	const { data, isFetching } = useQuery({
		queryKey: ['return-items', returnTransactionId],
		queryFn: () => fetchReturnItemsByReturnId(returnTransactionId),
		refetchOnWindowFocus: false,
	});

	return { data, isFetching };
};

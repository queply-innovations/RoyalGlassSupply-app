import { useQuery } from '@tanstack/react-query';
import { fetchReturns } from '../api/Returns';

export const useReturnsQuery = () => {
	// Query for fetching returns and isLoading state
	const { data, isFetching } = useQuery({
		queryKey: ['return-transactions'],
		queryFn: () => fetchReturns(),
		refetchOnWindowFocus: false,
	});

	return { data, isFetching };
};

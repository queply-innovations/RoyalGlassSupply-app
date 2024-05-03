import { useQuery } from '@tanstack/react-query';
import { fetchTopSellingProducts } from '../api/Reports';

export const useTopSellingProductsQuery = () => {
	const { data, isFetching } = useQuery({
		queryKey: ['topSellingProducts'],
		queryFn: () => fetchTopSellingProducts(),
		refetchOnWindowFocus: false,
	});

	return { data, isFetching };
};

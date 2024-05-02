import { useQuery } from '@tanstack/react-query';
import { fetchReportAnalytics } from '../api/Reports';

export const useReportAnalyticsQuery = (year: number, warehouseId?: number) => {
	const { data, isFetching } = useQuery({
		queryKey: ['reportAnalytics', year, warehouseId],
		queryFn: () => fetchReportAnalytics(year, warehouseId),
		refetchOnWindowFocus: false,
	});

	return { data, isFetching };
};

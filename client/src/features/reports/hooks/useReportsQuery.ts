import { useQuery } from '@tanstack/react-query';
import { fetchReports } from '../api/Reports';
import { DateRange } from 'react-day-picker';

export const useReportsQuery = (dateRange: DateRange | undefined) => {
	const { data, isFetching } = useQuery({
		queryKey: ['reports', dateRange],
		queryFn: () =>
			fetchReports(
				dateRange?.from ??
					new Date(new Date().setDate(new Date().getDate() - 90)),
				dateRange?.to ?? new Date(),
			),
		refetchOnWindowFocus: false,
	});

	return { data, isFetching };
};

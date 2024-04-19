import { useQuery } from '@tanstack/react-query';
import { fetchInvoicesDateRange } from '../api/Reports';
import { DateRange } from 'react-day-picker';

export const useSalesRevenueQuery = (dateRange: DateRange | undefined) => {
	const { data, isFetching } = useQuery({
		queryKey: ['salesRevenue', dateRange],
		queryFn: () =>
			fetchInvoicesDateRange(
				dateRange?.from ??
					new Date(new Date().setDate(new Date().getDate() - 90)),
				dateRange?.to ?? new Date(),
			),
		refetchOnWindowFocus: false,
	});

	const revenue = data?.reduce(
		(acc, invoice) => acc + invoice.total_amount_due,
		0,
	);

	return { revenue, data, isFetching };
};

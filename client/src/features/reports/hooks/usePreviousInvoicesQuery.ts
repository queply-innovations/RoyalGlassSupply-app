import { useQuery } from '@tanstack/react-query';
import { fetchPreviousInvoices } from '../api/Reports';
import { lastDayOfPreviousMonth } from '../utils/dateUtils';

export const usePreviousInvoicesQuery = (dateTo: Date | undefined) => {
	const { data, isFetching } = useQuery({
		queryKey: ['previousInvoices', dateTo],
		queryFn: () =>
			fetchPreviousInvoices(dateTo ? dateTo : lastDayOfPreviousMonth),
		refetchOnWindowFocus: false,
	});

	return { data, isFetching };
};

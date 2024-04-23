import { useQuery } from '@tanstack/react-query';
import { fetchInvoicesDateRange } from '../api/Reports';
import { DateRange } from 'react-day-picker';

export const useCustomerReportQuery = (
	dateRangePrev: DateRange,
	dateRangeCurrent: DateRange,
) => {
	const { data: previousInvoices } = useQuery({
		queryKey: ['previousInvoices'],
		queryFn: () =>
			fetchInvoicesDateRange(dateRangePrev.from!, dateRangePrev.to!),
		refetchOnWindowFocus: false,
	});
	const { data: currentMonthInvoices, isFetching } = useQuery({
		queryKey: ['currentMonthInvoices'],
		queryFn: () =>
			fetchInvoicesDateRange(dateRangeCurrent.from!, dateRangeCurrent.to!),
		refetchOnWindowFocus: false,
	});

	const previousCustomers = previousInvoices?.map(
		invoice => invoice.customer.id,
	);
	const currentCustomers = currentMonthInvoices?.map(
		invoice => invoice.customer.id,
	);
	const uniquePreviousCustomers = [...new Set(previousCustomers)];
	const uniqueCurrentCustomers = [...new Set(currentCustomers)];

	const returningCustomers = uniqueCurrentCustomers.filter(customerId =>
		uniquePreviousCustomers.includes(customerId),
	);
	const newCustomers = uniqueCurrentCustomers.filter(
		customerId => !uniquePreviousCustomers.includes(customerId),
	);

	return {
		returningCustomers,
		newCustomers,
		isFetching,
	};
};

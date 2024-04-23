import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useSalesRevenueQuery } from '../hooks/useSalesRevenueQuery';
import { useDebounce } from '@uidotdev/usehooks';
import { usePreviousInvoicesQuery } from '../hooks/usePreviousInvoicesQuery';
import { currentDate } from '../utils/dateUtils';

interface ReportsContextProps {
	dateRange: DateRange | undefined;
	setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
	revenue: number | undefined;
	isSalesRevenueFetching: boolean;
	returningCustomers: number[];
	newCustomers: number[];
	isPreviousInvoicesFetching: boolean;
}

interface ReportsProviderProps {
	children: ReactNode;
}

const ReportsContext = createContext<ReportsContextProps | undefined>(
	undefined,
);

export const ReportsProvider = ({ children }: ReportsProviderProps) => {
	// State handler for global date range
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: new Date(new Date().setDate(new Date().getDate() - 90)),
		to: currentDate,
	});

	// Debounce date range, avoids instant re-fetching before 2500 milliseconds
	const [dateRangeQuery] = useDebounce([dateRange], 2500);

	// Fetch sales revenue data based on date range
	const {
		revenue,
		isFetching: isSalesRevenueFetching,
		data: currentInvoices,
	} = useSalesRevenueQuery(dateRangeQuery);
	// Fetch previous invoices data based on date range
	// Used for comparison of returning and new customers
	const { data: previousInvoices, isFetching: isPreviousInvoicesFetching } =
		usePreviousInvoicesQuery(dateRangeQuery?.from);

	// Calculate returning and new customers based on invoices data
	const { returningCustomers, newCustomers } = useMemo<{
		returningCustomers: number[];
		newCustomers: number[];
	}>(() => {
		const previousCustomers = previousInvoices?.map(
			invoice => invoice.customer.id,
		);
		const currentCustomers = currentInvoices?.map(
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

		return { returningCustomers, newCustomers };
	}, [currentInvoices, previousInvoices]);

	const value = {
		dateRange,
		setDateRange,
		revenue,
		isSalesRevenueFetching,
		returningCustomers,
		newCustomers,
		isPreviousInvoicesFetching,
	};

	return (
		<ReportsContext.Provider value={value}>
			{children}
		</ReportsContext.Provider>
	);
};

export function useReportsContext() {
	const context = useContext(ReportsContext);
	if (context === undefined) {
		throw new Error(
			'useReportsContext must be used within a ReportsProvider',
		);
	}
	return context;
}

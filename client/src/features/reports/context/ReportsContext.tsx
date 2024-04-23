import { ReactNode, createContext, useContext, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useSalesRevenueQuery } from '../hooks/useSalesRevenueQuery';
import { useDebounce } from '@uidotdev/usehooks';
import { useCustomerReportQuery } from '../hooks/useCustomerReportQuery';
import {
	currentDate,
	firstDayOfCurrentMonth,
	lastDayOfPreviousMonth,
} from '../utils/dateUtils';

interface ReportsContextProps {
	dateRange: DateRange | undefined;
	setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
	revenue: number | undefined;
	isSalesRevenueFetching: boolean;
	returningCustomers: number[];
	newCustomers: number[];
	isCustomersFetching: boolean;
}

interface ReportsProviderProps {
	children: ReactNode;
}

const ReportsContext = createContext<ReportsContextProps | undefined>(
	undefined,
);

export const useCustomerReportData = (
	dateRangePrev: DateRange,
	dateRangeCurrent: DateRange,
): {
	returningCustomers: number[];
	newCustomers: number[];
	isFetching: boolean;
} => {
	const { returningCustomers, newCustomers, isFetching } =
		useCustomerReportQuery(
			{ from: dateRangePrev.from, to: dateRangePrev.to },
			{ from: dateRangeCurrent.from, to: dateRangeCurrent.to },
		);

	return { returningCustomers, newCustomers, isFetching };
};

export const ReportsProvider = ({ children }: ReportsProviderProps) => {
	// State handler for global date range
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: new Date(new Date().setDate(new Date().getDate() - 90)),
		to: currentDate,
	});

	// Debounce date range, avoids instant re-fetching before 2500 milliseconds
	const [dateRangeQuery] = useDebounce([dateRange], 2500);

	// Fetch sales revenue data based on date range
	const { revenue, isFetching: isSalesRevenueFetching } =
		useSalesRevenueQuery(dateRangeQuery);
	// Fetch customer report data based on date range
	const {
		returningCustomers,
		newCustomers,
		isFetching: isCustomersFetching,
	} = useCustomerReportData(
		{ from: new Date('2024-01-01'), to: lastDayOfPreviousMonth },
		{ from: firstDayOfCurrentMonth, to: currentDate },
	);

	const value = {
		dateRange,
		setDateRange,
		revenue,
		isSalesRevenueFetching,
		returningCustomers,
		newCustomers,
		isCustomersFetching,
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

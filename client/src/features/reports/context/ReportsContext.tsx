import { ReactNode, createContext, useContext, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useDebounce } from '@uidotdev/usehooks';
import { currentDate } from '../utils/dateUtils';
import { useReportsQuery } from '../hooks/useReportsQuery';
import { Reports } from '../types';

interface ReportsContextProps {
	dateRange: DateRange | undefined;
	setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
	reports: Reports | undefined;
	isReportsFetching: boolean;
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

	// Fetch reports data based on date range
	const { data: reports, isFetching: isReportsFetching } =
		useReportsQuery(dateRangeQuery);

	const value = {
		dateRange,
		setDateRange,
		reports,
		isReportsFetching,
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

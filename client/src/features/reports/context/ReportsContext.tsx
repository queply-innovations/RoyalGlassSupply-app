import { ReactNode, createContext, useContext, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useSalesRevenueQuery } from '../hooks/useSalesRevenueQuery';
import { useDebounce } from '@uidotdev/usehooks';

interface ReportsContextProps {
	dateRange: DateRange | undefined;
	setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
	revenue: number | undefined;
	isFetching: boolean;
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
		to: new Date(),
	});

	// Debounce date range, avoids instant re-fetching before 2500 milliseconds
	const [dateRangeQuery] = useDebounce([dateRange], 2500);

	// Fetch sales revenue data based on date range
	const { revenue, isFetching } = useSalesRevenueQuery(dateRangeQuery);

	const value = {
		dateRange,
		setDateRange,
		revenue,
		isFetching,
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

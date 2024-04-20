import { ReactNode, createContext, useContext, useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import { useSalesRevenueQuery } from '@/features/reports/hooks/useSalesRevenueQuery';

interface DashboardReportsContextProps {
	monthRange: DateRange;
	revenue: number | undefined;
	isFetching: boolean;
}

interface DashboardReportsProviderProps {
	children: ReactNode;
}

const DashboardReportsContext = createContext<
	DashboardReportsContextProps | undefined
>(undefined);

export const DashboardReportsProvider = ({
	children,
}: DashboardReportsProviderProps) => {
	const monthRange = useMemo(() => {
		// value for date range starting from the first day of the current month to current date
		return {
			from: new Date(new Date().setDate(1)),
			to: new Date(),
		};
	}, []);

	// Fetch sales revenue data based on date range
	const { revenue, isFetching } = useSalesRevenueQuery(monthRange);

	const value = {
		monthRange,
		revenue,
		isFetching,
	};

	return (
		<DashboardReportsContext.Provider value={value}>
			{children}
		</DashboardReportsContext.Provider>
	);
};

export function useDashboardReportsContext() {
	const context = useContext(DashboardReportsContext);
	if (context === undefined) {
		throw new Error(
			'useDashboardReportsContext must be used within a DashboardReportsProvider',
		);
	}
	return context;
}

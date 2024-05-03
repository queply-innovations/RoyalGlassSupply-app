import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useReportsQuery } from '@/features/reports/hooks/useReportsQuery';
import {
	InventoryLevelReport,
	ReportAnalytics,
	Reports,
	TopSellingProducts,
} from '@/features/reports/types';
import { useReportAnalyticsQuery } from '@/features/reports/hooks/useReportAnalyticsQuery';
import { useTopSellingProductsQuery } from '@/features/reports/hooks/useTopSellingProductsQuery';
import { useInventoryLevelReportQuery } from '@/features/reports/hooks/useInventoryLevelReportQuery';

interface DashboardReportsContextProps {
	monthRange: DateRange;
	reports: Reports | undefined;
	isReportsFetching: boolean;
	reportAnalytics: ReportAnalytics[] | undefined;
	isReportAnalyticsFetching: boolean;
	topSellingProducts: TopSellingProducts[] | undefined;
	isTopSellingProductsFetching: boolean;
	inventoryLevel: InventoryLevelReport | undefined;
	isInventoryLevelFetching: boolean;
	warehouseId: number;
	setWarehouseId: React.Dispatch<React.SetStateAction<number>>;
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

	// Fetch reports data based on date range
	// const { revenue, isFetching } = useSalesRevenueQuery(monthRange);
	const { data: reports, isFetching: isReportsFetching } =
		useReportsQuery(monthRange);

	// Fetch reports analytics data for the current year
	const { data: reportAnalytics, isFetching: isReportAnalyticsFetching } =
		useReportAnalyticsQuery(new Date().getFullYear(), 0);

	// Fetch top selling products
	const {
		data: topSellingProducts,
		isFetching: isTopSellingProductsFetching,
	} = useTopSellingProductsQuery();

	const [warehouseId, setWarehouseId] = useState(1);
	const { data: inventoryLevel, isFetching: isInventoryLevelFetching } =
		useInventoryLevelReportQuery(warehouseId);

	const value = {
		monthRange,
		reports,
		isReportsFetching,
		reportAnalytics,
		isReportAnalyticsFetching,
		topSellingProducts,
		isTopSellingProductsFetching,
		inventoryLevel,
		isInventoryLevelFetching,
		warehouseId,
		setWarehouseId,
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

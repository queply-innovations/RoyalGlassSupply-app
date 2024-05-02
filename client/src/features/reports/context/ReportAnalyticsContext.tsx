import React, { createContext, useState } from 'react';
import { useReportAnalyticsQuery } from '../hooks/useReportAnalyticsQuery';
import { ReportAnalytics } from '../types';

interface ReportAnayticsContextProps {
	reportAnalytics: ReportAnalytics[] | undefined;
	isReportAnalyticsFetching: boolean;
	year: number;
	setYear: React.Dispatch<React.SetStateAction<number>>;
	warehouseId: number | undefined;
	setWarehouseId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface ReportAnayticsProviderProps {
	children: React.ReactNode;
}

const ReportAnalyticsContext = createContext<
	ReportAnayticsContextProps | undefined
>(undefined);

export const ReportAnalyticsProvider = ({
	children,
}: ReportAnayticsProviderProps) => {
	const [year, setYear] = useState<number>(new Date().getFullYear());
	const [warehouseId, setWarehouseId] = useState<number | undefined>();

	const { data: reportAnalytics, isFetching: isReportAnalyticsFetching } =
		useReportAnalyticsQuery(year, warehouseId);

	const value = {
		reportAnalytics,
		isReportAnalyticsFetching,
		year,
		setYear,
		warehouseId,
		setWarehouseId,
	};

	return (
		<ReportAnalyticsContext.Provider value={value}>
			{children}
		</ReportAnalyticsContext.Provider>
	);
};

export function useReportAnalytics() {
	const context = React.useContext(ReportAnalyticsContext);
	if (context === undefined) {
		throw new Error(
			'useReportAnalyticsContext must be used within a ReportAnalyticsProvider',
		);
	}

	return context;
}

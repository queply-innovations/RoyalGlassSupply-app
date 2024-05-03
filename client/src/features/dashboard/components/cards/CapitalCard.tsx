import { useDashboardReportsContext } from '../../context/DashboardReportsContext';
import { ReportCard } from '@/features/reports/components';

export const CapitalCard = () => {
	const { reports, isReportsFetching } = useDashboardReportsContext();

	return (
		<>
			<ReportCard
				title="Capital"
				tooltip="Calculated capital of sold products within the current month."
				bgClassName="bg-orange-50"
				textColorClassName="text-orange-800"
			>
				{isReportsFetching ? (
					<div className="h-7 w-full animate-pulse rounded-md bg-orange-700/10"></div>
				) : (
					<p className="text-right text-xl font-semibold tracking-tight">
						{Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'PHP',
						}).format(reports?.total_capital ?? 0)}
					</p>
				)}
			</ReportCard>
		</>
	);
};

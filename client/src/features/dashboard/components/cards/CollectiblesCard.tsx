import { useDashboardReportsContext } from '../../context/DashboardReportsContext';
import { ReportCard } from '@/features/reports/components';

export const CollectiblesCard = () => {
	const { reports, isReportsFetching } = useDashboardReportsContext();

	return (
		<>
			<ReportCard
				title="Collectibles"
				tooltip="Total amount owed from customers for non-payment type transactions within the current month."
				bgClassName="bg-stone-50"
				textColorClassName="text-stone-800"
			>
				{isReportsFetching ? (
					<div className="h-7 w-full animate-pulse rounded-md bg-stone-700/10"></div>
				) : (
					<p className="text-right text-xl font-semibold tracking-tight">
						{Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'PHP',
						}).format(0)}
					</p>
				)}
			</ReportCard>
		</>
	);
};

import { useDashboardReportsContext } from '../../context/DashboardReportsContext';
import { ReportCard } from '@/features/reports/components';

export const ExpensesCard = () => {
	const { reports, isReportsFetching } = useDashboardReportsContext();

	return (
		<>
			<ReportCard
				title="Expenses"
				tooltip="Calculated by adding up the operational expenses within the current month."
				bgClassName="bg-violet-50"
				textColorClassName="text-violet-800"
			>
				{isReportsFetching ? (
					<div className="h-7 w-full animate-pulse rounded-md bg-violet-700/10"></div>
				) : (
					<p className="text-right text-xl font-semibold tracking-tight">
						{Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'PHP',
						}).format(reports?.total_expenses ?? 0)}
					</p>
				)}
			</ReportCard>
		</>
	);
};

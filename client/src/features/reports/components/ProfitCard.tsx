import { useReportsContext } from '../context/ReportsContext';
import { ReportCard } from './ReportCard';

export const ProfitCard = () => {
	const { reports, isReportsFetching } = useReportsContext();

	return (
		<>
			<ReportCard
				title="Profit"
				tooltip="Calculated by subtracting the sum of capital and expenses from sales."
				bgClassName="bg-blue-50"
				textColorClassName="text-blue-800"
			>
				{isReportsFetching ? (
					<div className="h-7 w-full animate-pulse rounded-md bg-blue-700/10"></div>
				) : (
					<p className="text-right text-xl font-semibold tracking-tight">
						{Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'PHP',
						}).format(
							reports?.total_profit
								? reports.total_profit >= 0
									? reports.total_profit
									: 0
								: 0,
						)}
					</p>
				)}
			</ReportCard>
		</>
	);
};

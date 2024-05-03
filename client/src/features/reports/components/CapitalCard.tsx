import { useReportsContext } from '../context/ReportsContext';
import { ReportCard } from './ReportCard';

export const CapitalCard = () => {
	const { reports, isReportsFetching } = useReportsContext();

	return (
		<>
			<ReportCard
				title="Capital"
				tooltip="Calculated capital of sold products."
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

import { useReportsContext } from '../context/ReportsContext';
import { ReportCard } from './ReportCard';

export const SalesCard = () => {
	const { reports, isReportsFetching } = useReportsContext();

	return (
		<>
			<ReportCard
				title="Sales"
				tooltip="Calculated by adding up the total amount due in paid transactions."
				bgClassName="bg-green-50"
				textColorClassName="text-green-800"
			>
				{isReportsFetching ? (
					<div className="h-7 w-full animate-pulse rounded-md bg-green-700/10"></div>
				) : (
					<p className="text-right text-xl font-semibold tracking-tight">
						{Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'PHP',
						}).format(reports?.total_sales ?? 0)}
					</p>
				)}
			</ReportCard>
		</>
	);
};

import { useReportsContext } from '../context/ReportsContext';
import { ReportCard } from './ReportCard';

export const SalesRevenue = () => {
	const { revenue, isSalesRevenueFetching } = useReportsContext();

	return (
		<>
			<ReportCard
				title="Sales Revenue"
				tooltip="Shows the current revenue generated from selling goods within the date range."
			>
				{isSalesRevenueFetching ? (
					<div className="h-7 w-full  animate-pulse rounded-md bg-slate-600/20"></div>
				) : (
					<p className="text-2xl font-bold tracking-tight">
						{Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'PHP',
						}).format(revenue ?? 0)}
					</p>
				)}
			</ReportCard>
		</>
	);
};

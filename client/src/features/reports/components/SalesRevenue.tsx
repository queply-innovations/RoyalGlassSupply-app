import { useReportsContext } from '../context/ReportsContext';
import { ReportCard } from './ReportCard';

export const SalesRevenue = () => {
	const { revenue, isSalesRevenueFetching } = useReportsContext();

	return (
		<>
			<ReportCard
				title="Sales Revenue"
				tooltip="Revenue generated from selling goods within the date range."
				bgClassName="bg-green-50"
				textColorClassName="text-green-800"
			>
				{isSalesRevenueFetching ? (
					<div className="h-7 w-full animate-pulse rounded-md bg-black/10"></div>
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

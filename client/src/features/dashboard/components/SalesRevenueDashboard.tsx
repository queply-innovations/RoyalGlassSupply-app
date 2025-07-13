import { ReportCard } from '@/features/reports/components';
import { useDashboardReportsContext } from '..';

export const SalesRevenueDashboard = () => {
	const { revenue, isFetching, monthRange } = useDashboardReportsContext();

	return (
		<>
			<ReportCard
				title="Sales Revenue"
				tooltip={`Shows the current revenue generated from ${monthRange.from ? Intl.DateTimeFormat('en-PH', { dateStyle: 'long' }).format(monthRange.from) : '...'} to today.`}
			>
				{isFetching ? (
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

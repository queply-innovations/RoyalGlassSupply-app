import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Chart from 'react-apexcharts';
import { useReportAnalytics } from '../../context/ReportAnalyticsContext';
import { YearPicker } from './YearPicker';

export const SalesRevenueHistory = () => {
	const { reportAnalytics, isReportAnalyticsFetching } = useReportAnalytics();

	return (
		<>
			<Card className="flex min-h-[28rem] w-full flex-col gap-4">
				<CardHeader className="flex flex-none flex-row items-center justify-between gap-4 pb-2">
					<CardTitle className="flex w-full flex-row justify-between text-base font-bold">
						Reports Analytics
					</CardTitle>
					<CardDescription className="!mt-1 font-bold uppercase">
						<YearPicker />
					</CardDescription>
				</CardHeader>
				<CardContent className="mx-auto w-[99%] flex-1 overflow-hidden">
					{isReportAnalyticsFetching ? (
						<div className="h-[350px] w-full animate-pulse rounded-2xl bg-slate-200/50"></div>
					) : (
						<Chart
							type="line"
							height={'100%'}
							width={'100%'}
							series={[
								{
									name: 'Sales',
									data:
										reportAnalytics?.map(
											report => report.gross_income ?? 0,
										) ?? [],
								},
								{
									name: 'Profit',
									data:
										reportAnalytics?.map(report =>
											report.net_profit >= 0 ? report.net_profit : 0,
										) ?? [],
								},
								{
									name: 'Capital',
									data:
										reportAnalytics?.map(
											report => report.capital ?? 0,
										) ?? [],
								},
								{
									name: 'Expenses',
									data:
										reportAnalytics?.map(
											report => report.expenses ?? 0,
										) ?? [],
								},
							]}
							options={{
								markers: { size: 5 },
								stroke: { width: 4 },
								colors: ['#16a34a', '#2563eb', '#f59e0b', '#7c3aed'],
								xaxis: {
									tooltip: {
										enabled: false,
									},
									categories:
										reportAnalytics?.map(
											report => report.Month ?? '',
										) ?? [],
									labels: {
										style: {
											fontFamily: 'sans-serif',
											fontSize: '12px',
											fontWeight: 600,
										},
									},
								},
								yaxis: {
									labels: {
										style: {
											fontFamily: 'sans-serif',
											fontSize: '12px',
											fontWeight: 600,
										},
										formatter: value => {
											return Intl.NumberFormat('en-US', {
												style: 'currency',
												currency: 'PHP',
											}).format(value);
										},
									},
								},
								tooltip: {
									style: {
										fontFamily: 'sans-serif',
										fontSize: '14px',
									},
								},
								legend: {
									position: 'top',
									horizontalAlign: 'right',
								},
								chart: {
									toolbar: {
										show: false,
									},
								},
							}}
						></Chart>
					)}
				</CardContent>
			</Card>
		</>
	);
};

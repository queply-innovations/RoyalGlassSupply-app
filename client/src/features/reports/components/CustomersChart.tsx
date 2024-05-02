import Chart from 'react-apexcharts';
import { useReportsContext } from '../context/ReportsContext';

export const CustomersChart = () => {
	const { reports, isReportsFetching } = useReportsContext();
	const chartSeries = [
		reports?.new_customers ?? 0,
		reports?.returning_customers ?? 0,
	];
	const chartOptions = {
		series: [reports?.new_customers ?? 0, reports?.returning_customers ?? 0],
		labels: ['New customers', 'Returning customers'],
		colors: ['#3b82f6', '#1e3a8a'],
		legend: {
			show: true,
			fontFamily: 'sans-serif',
			fontSize: '14px',
			fontWeight: 500,
			itemMargin: {
				vertical: 4,
			},
		},
		dataLabels: {
			enabled: true,
			dropShadow: {
				top: 2,
				blur: 3,
				opacity: 0.5,
			},
			style: {
				fontFamily: 'Inter',
				fontSize: '12px',
				fontWeight: 600,
			},
		},
		tooltip: {
			style: {
				fontFamily: 'Inter',
				fontSize: '14px',
			},
		},
		plotOptions: {
			pie: {
				donut: {
					size: '50%',
				},
			},
		},
		chart: {
			animations: {
				speed: 600,
			},
		},
	};
	return (
		<>
			{!isReportsFetching ? (
				<Chart
					series={chartSeries}
					options={chartOptions}
					type="donut"
					height="100%"
					width="100%"
				/>
			) : (
				<div className="flex h-72 w-full animate-pulse justify-center p-4">
					<div className="mx-auto h-full w-72 rounded-2xl bg-slate-200"></div>
					<div className="h-20 w-44 rounded-2xl bg-slate-200"></div>
				</div>
			)}
		</>
	);
};

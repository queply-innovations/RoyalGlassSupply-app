import Chart from 'react-apexcharts';
import { useReportsContext } from '../context/ReportsContext';

export const CustomersChart = () => {
	const { newCustomers, returningCustomers, isCustomersFetching } =
		useReportsContext();
	const chartSeries = [newCustomers.length, returningCustomers.length];
	const chartOptions = {
		series: [newCustomers.length, returningCustomers.length],
		labels: ['New customers', 'Returning customers'],
		colors: ['#1e3a8a', '#3b82f6'],
		legend: {
			show: true,
			fontFamily: 'Inter',
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
			{!isCustomersFetching && (
				<Chart
					series={chartSeries}
					options={chartOptions}
					type="donut"
					height="100%"
					width="100%"
				/>
			)}
		</>
	);
};

import Chart from 'react-apexcharts';

interface CustomerChartProps {}

export const CustomerChart = ({}: CustomerChartProps) => {
	const chartSeries = [31, 69]; //TODO: add value here for customers
	const chartOptions = {
		series: [31, 69], //TODO: add value here for customers
		labels: ['New Customers', 'Returning Customers'],
		dataLabels: {
			enabled: true,
		},
	};
	return (
		<>
			<Chart
				series={chartSeries}
				options={chartOptions}
				type="donut"
				height={200}
				width="100%"
			/>
		</>
	);
};

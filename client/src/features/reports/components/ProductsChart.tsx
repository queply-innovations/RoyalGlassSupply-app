import Chart from 'react-apexcharts';

interface ProductsChartProps {}

export const ProductsChart = ({}: ProductsChartProps) => {
	const chartSeries = [31, 69]; //TODO: add value here for products
	const chartOptions = {
		series: [31, 69], //TODO: add value here for products
		labels: ['New Products', 'Returning Products'],
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

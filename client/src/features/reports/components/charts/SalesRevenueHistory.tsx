import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { RefObject, useEffect, useRef, useState } from 'react';
import Chart from 'react-apexcharts';
import { useReportsContext } from '../../context/ReportsContext';

export const SalesRevenueHistory = () => {
	const { lastTwelveMonths, salesRevenueLastTwelveMonths } =
		useReportsContext();

	const ref: RefObject<HTMLDivElement> = useRef(null);

	const [chartWidth, setChartWidth] = useState<number>(500);
	const [chartHeight, setChartHeight] = useState<number>(300);

	useEffect(() => {
		const updateSize = () => {
			if (ref.current) {
				const computedStyle = window.getComputedStyle(ref.current);
				const paddingLeft = parseFloat(computedStyle.paddingLeft);
				const paddingRight = parseFloat(computedStyle.paddingRight);
				const paddingTop = parseFloat(computedStyle.paddingTop);
				const paddingBottom = parseFloat(computedStyle.paddingBottom);

				const innerWidthValue =
					ref.current.clientWidth - paddingLeft - paddingRight;
				const innerHeightValue =
					ref.current.clientHeight - paddingTop - paddingBottom;

				setChartWidth(innerWidthValue);
				setChartHeight(innerHeightValue);
			}
		};

		window.addEventListener('resize', updateSize);
		updateSize();

		return () => window.removeEventListener('resize', updateSize);
	}, []);

	return (
		<>
			<Card className="flex min-h-[28rem] w-full flex-col gap-4" ref={ref}>
				<CardHeader className="flex flex-none flex-row items-center justify-between gap-4 pb-2">
					<CardTitle className="font-bold">
						Sales Revenue History
					</CardTitle>
					<CardDescription className="!mt-1 font-bold uppercase"></CardDescription>
				</CardHeader>
				<CardContent className="w-full flex-1 overflow-hidden">
					<Chart
						type="line"
						height={'100%'}
						width={'100%'}
						series={[
							{
								name: 'Sales Revenue',
								data: salesRevenueLastTwelveMonths,
							},
						]}
						options={{
							markers: { size: 5 },
							stroke: { width: 4 },
							colors: ['#16a34a'],
							xaxis: {
								tooltip: {
									enabled: false,
								},
								categories: lastTwelveMonths.map(dateString =>
									Intl.DateTimeFormat('en-US', {
										year: 'numeric',
										month: 'short',
									}).format(new Date(dateString)),
								),
								labels: {
									style: {
										fontFamily: 'Inter',
										fontSize: '12px',
										fontWeight: 600,
									},
								},
							},
							yaxis: {
								labels: {
									style: {
										fontFamily: 'Inter',
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
									fontFamily: 'Inter',
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
				</CardContent>
			</Card>
		</>
	);
};

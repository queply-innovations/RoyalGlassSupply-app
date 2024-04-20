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

export const GrossAndNetProfitCard = () => {
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
					<CardTitle className="font-bold">Gross & Net Profit</CardTitle>
					<CardDescription className="!mt-1 font-bold uppercase"></CardDescription>
				</CardHeader>
				<CardContent className="w-full flex-1 overflow-hidden">
					<Chart
						type="line"
						height={'100%'}
						width={'100%'}
						series={[
							{
								name: 'GROSS INCOME',
								data: [
									234, 45, 67, 987, 345, 123, 500, 346, 234, 123, 564,
									341,
								],
							},
							{
								name: 'NET PROFIT',
								data: [
									432, 54, 76, 789, 543, 321, 231, 642, 432, 321, 465,
									143,
								],
							},
							{
								name: 'TOTAL CAPITAL',
								data: [
									925, 860, 487, 199, 726, 482, 70, 838, 328, 98, 74,
									706,
								],
							},
						]}
						options={{
							xaxis: {
								categories: [
									'Jan',
									'Feb',
									'Mar',
									'Apr',
									'May',
									'Jun',
									'Jul',
									'Aug',
									'Sep',
									'Oct',
									'Nov',
									'Dec',
								],
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

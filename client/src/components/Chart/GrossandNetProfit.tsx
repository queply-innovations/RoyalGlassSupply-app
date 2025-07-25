import { cn } from '@/utils/cn.utils';
import { VariantProps, cva } from 'class-variance-authority';
import { FC, RefObject, useEffect, useRef, useState } from 'react';
import Chart from 'react-apexcharts';

const GraphVariants = cva('graph', {
	variants: {
		variant: {
			default:
				'flex h-full w-full rounded-md border border-black/10 bg-black p-5 bg-white flex-col',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

interface GrossAndNetProfitProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof GraphVariants> {}

export const GrossAndNetProfit: FC<GrossAndNetProfitProps> = ({
	className,
	variant,
}) => {
	const ref: RefObject<HTMLDivElement> = useRef(null);

	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (ref.current) {
			const computedStyle = window.getComputedStyle(ref.current);
			const paddingTop = parseFloat(computedStyle.paddingTop);
			const paddingBottom = parseFloat(computedStyle.paddingBottom);
			const paddingLeft = parseFloat(computedStyle.paddingLeft);
			const paddingRight = parseFloat(computedStyle.paddingRight);
			const innerWidthValue =
				ref.current.clientWidth - paddingLeft - paddingRight;
			const innerHeightValue =
				ref.current.clientHeight - paddingTop - paddingBottom;

			setWidth(innerWidthValue);
			setHeight(innerHeightValue);
		}
	}, []);
	return (
		<>
			<div className={cn(GraphVariants({ variant, className }))} ref={ref}>
				<h2 className="w-full font-bold text-slate-800">Reports history</h2>
				<Chart
					type="line"
					height={height - 50}
					width={width}
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
								925, 860, 487, 199, 726, 482, 70, 838, 328, 98, 74, 706,
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
			</div>
		</>
	);
};

export default GrossAndNetProfit;

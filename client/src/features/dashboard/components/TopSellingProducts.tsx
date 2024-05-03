import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardReportsContext } from '../context/DashboardReportsContext';
import { TopSellingProductsTable } from './table/TopSellingProductsTable';
// import { TopSellingProducts as TopSellingProductsType } from '@/features/reports/types';

export const TopSellingProducts = () => {
	const { topSellingProducts, isTopSellingProductsFetching } =
		useDashboardReportsContext();

	return (
		<>
			<Card className="flex min-h-[28rem] w-[50%] flex-col gap-4">
				<CardHeader className="flex flex-none flex-row items-center justify-between gap-4 pb-2">
					<CardTitle className="flex w-full flex-row justify-between text-base font-bold">
						Top Selling Products
					</CardTitle>
				</CardHeader>
				<CardContent className="w-full flex-1 overflow-hidden">
					{isTopSellingProductsFetching ? (
						<div className="h-[350px] w-full animate-pulse rounded-2xl bg-slate-200/50"></div>
					) : (
						<TopSellingProductsTable
							data={topSellingProducts}
							isLoading={isTopSellingProductsFetching}
						/>
					)}
				</CardContent>
			</Card>
		</>
	);
};

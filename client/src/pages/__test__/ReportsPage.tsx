import GrossAndNetProfit from '@/components/Chart/GrossandNetProfit';
import { ReportCard, TopProductsCard } from '@/features/reports/components';
import { MainLayout } from '@/layouts/MainLayout';

export const Reports = () => {
	const dateFilters = ['Monthly', 'Quarterly', 'Yearly'];
	return (
		<>
			<MainLayout title="Reports">
				<div className="flex h-full w-full flex-col justify-between gap-5">
					<div className="flex w-full flex-row justify-between gap-5 ">
						<div className="flex flex-1 flex-col gap-4">
							<div className="flex flex-row gap-4">
								<ReportCard
									title="Sales Revenue"
									date
									formatAmount
									filter={dateFilters}
								/>
								<ReportCard
									title="Expected Profit"
									formatAmount
									filter={dateFilters}
								/>
							</div>
							<div className="flex flex-row gap-4">
								<ReportCard
									title="Total Collectibles"
									date
									formatAmount
									filter={dateFilters}
								/>
								<ReportCard
									title="Total Capital"
									formatAmount
									filter={dateFilters}
								/>
							</div>
						</div>
						<TopProductsCard />
					</div>
					<GrossAndNetProfit />
				</div>
			</MainLayout>
		</>
	);
};

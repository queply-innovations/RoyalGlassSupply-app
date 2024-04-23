import GrossAndNetProfit from '@/components/Chart/GrossandNetProfit';
import { ReportCard, CustomersCard } from '@/features/reports/components';
import { MainLayout } from '@/layouts/MainLayout';
import { DatePickerWithRange } from '@/features/reports/components/DatePickerWithRange';
import { ReportsProvider } from '@/features/reports';
import { SalesRevenue } from '@/features/reports/components/SalesRevenue';
import { ResetToDefaultButton } from '@/features/reports/components/ResetToDefaultButton';
import { GrossAndNetProfitCard } from '@/features/reports/components/charts/GrossAndNetProfit';

export const Reports = () => {
	const dateFilters = ['Monthly', 'Quarterly', 'Yearly'];

	return (
		<>
			<MainLayout title="Reports">
				<ReportsProvider>
					<div className="flex h-full w-full flex-1 flex-col gap-5 rounded-xl border border-black/10 bg-white p-4">
						<div className="h-full max-h-full w-full max-w-full overflow-auto">
							<div className="flex w-full max-w-full flex-col gap-4">
								<div className="flex flex-row gap-2">
									<DatePickerWithRange />
									<ResetToDefaultButton />
								</div>
								<div className="flex flex-1 flex-col gap-4">
									<div className="flex flex-row gap-4">
										<SalesRevenue />
										<ReportCard title="Expected Profit">
											<p className="text-2xl font-bold tracking-tight">
												{Intl.NumberFormat('en-US', {
													style: 'currency',
													currency: 'PHP',
												}).format(4508)}
											</p>
										</ReportCard>
										<ReportCard title="Collectibles">
											<p className="text-2xl font-bold tracking-tight">
												{Intl.NumberFormat('en-US', {
													style: 'currency',
													currency: 'PHP',
												}).format(7129)}
											</p>
										</ReportCard>
										<ReportCard title="Capital">
											<p className="text-2xl font-bold tracking-tight">
												{Intl.NumberFormat('en-US', {
													style: 'currency',
													currency: 'PHP',
												}).format(11028)}
											</p>
										</ReportCard>
									</div>
								</div>
								<CustomersCard />
								<GrossAndNetProfitCard />
							</div>
						</div>
					</div>
				</ReportsProvider>
			</MainLayout>
		</>
	);
};

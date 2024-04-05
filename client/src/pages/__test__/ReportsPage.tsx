import { CustomerCard, ReportCard } from '@/features/reports/components';
import { MainLayout } from '@/layouts/MainLayout';

export const Reports = () => {
	return (
		<>
			<MainLayout title="Reports">
				<div className="flex w-full flex-row justify-between gap-5">
					<div className="flex flex-1 flex-col gap-4">
						<div className="flex flex-row gap-4">
							<ReportCard title="Sales Revenue" date formatAmount />
							<ReportCard title="Today's Revenue" formatAmount />
							<ReportCard title="Expected Profit" formatAmount />
						</div>
						<div className="flex flex-row gap-4">
							<ReportCard title="Total Collectibles" date formatAmount />
							<ReportCard title="Total Inventories">Test</ReportCard>
							<ReportCard title="Total Capital" formatAmount />
						</div>
					</div>
					<CustomerCard />
				</div>
			</MainLayout>
		</>
	);
};

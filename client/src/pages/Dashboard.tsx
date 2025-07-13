import TransferStatus from '@/components/Tables/Transfer/Transfer';
import { useAuth } from '@/context/AuthContext';
import { DashboardReportsProvider } from '@/features/dashboard';
import {
	SalesCard,
	ProfitCard,
	CapitalCard,
	ExpensesCard,
	CollectiblesCard,
} from '@/features/dashboard/components/cards';
import { MainLayout } from '@/layouts/MainLayout';
import { ReportsAnalytics } from '@/features/dashboard/components';
import { TopSellingProducts } from '@/features/dashboard/components/TopSellingProducts';
import { LayoutDashboard } from 'lucide-react';

export const Dashboard = () => {
	const { auth } = useAuth();

	return (
		<MainLayout title="Dashboard">
			<DashboardReportsProvider>
				{auth.role?.includes('admin') ? (
					<>
						<div className="flex h-full w-full flex-1 flex-col gap-5 rounded-xl">
							<div className="flex h-full max-h-full w-full max-w-full flex-col gap-4 overflow-auto">
								<div className="flex flex-none flex-row gap-2 rounded-lg border bg-white p-2 shadow-sm">
									<SalesCard />
									<ProfitCard />
									<CapitalCard />
									<ExpensesCard />
									<CollectiblesCard />
								</div>
								<div className="row-container flex flex-1 flex-col gap-4">
									<div className="row-container flex h-[480px] flex-row justify-between gap-4">
										<ReportsAnalytics />
										<TransferStatus />
									</div>
									<div className="row-container flex h-[480px] flex-row justify-between gap-4">
										<TopSellingProducts />
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
					<div className="flex h-full w-full items-center justify-center">
						<div className="flex flex-col items-center gap-6">
							<LayoutDashboard
								strokeWidth={2}
								size={142}
								className="text-slate-700/30"
							/>
							<p className="text-slate-700/60">
								Welcome to dashboard. Navigate to the items on the left.
							</p>
						</div>
					</div>
				)}
			</DashboardReportsProvider>
		</MainLayout>
	);
};

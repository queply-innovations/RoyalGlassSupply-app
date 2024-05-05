import TransferStatus from '@/components/Tables/Transfer/Transfer';
import { Navigate } from 'react-router-dom';
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
import { InventoryLevelReport } from '@/features/dashboard/components/InventoryLevelReport';

// interface DashboardProps {
// 	state: Array<unknown>;
// }

export const Dashboard = () => {
	const { auth } = useAuth();

	// Redirect to POS if user role includes 'encoder' or 'sales'
	if (auth.role?.includes('encoder') || auth.role?.includes('sales')) {
		return <Navigate to="/pos" />;
	}

	return (
		<MainLayout title="Dashboard">
			<DashboardReportsProvider>
				{auth.role?.includes('admin') && (
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
										{/* <InventoryLevelReport /> */}
										<TopSellingProducts />
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</DashboardReportsProvider>
		</MainLayout>
	);
};

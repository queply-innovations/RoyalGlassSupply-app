import GrossAndNetProfit from '@/components/Chart/GrossandNetProfit';
import { InfoCard } from '@/components/InfoCard';
import InventoryTable from '@/components/Tables/Inventory/inventory';
import TopSellingProducts from '@/components/Tables/TopSellingProducts/topSellingProducts';
import TransferStatus from '@/components/Tables/Transfer/Transfer';
import LayoutWrapper from '@/layouts/Layout';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Navbar } from '@/components';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency } from '@/utils/FormatCurrency';
import { DashboardReportsProvider } from '@/features/dashboard';
import { SalesRevenueDashboard } from '@/features/dashboard/components/SalesRevenueDashboard';
import {
	SalesCard,
	ProfitCard,
	CapitalCard,
	ExpensesCard,
	CollectiblesCard,
} from '@/features/dashboard/components/cards';
import { MainLayout } from '@/layouts/MainLayout';

// interface DashboardProps {
// 	state: Array<unknown>;
// }

export const Dashboard = () => {
	const { auth } = useAuth();

	const navigate = useNavigate();
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
										<GrossAndNetProfit className="h-full min-h-[440px] max-w-[50%] shadow-sm" />
										<TransferStatus />
									</div>
									<div className="row-container flex h-[480px] flex-row justify-between gap-4">
										<InventoryTable />
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

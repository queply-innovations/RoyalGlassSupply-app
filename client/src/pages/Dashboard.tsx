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
		<LayoutWrapper>
			<div className="flex h-screen flex-col gap-y-4">
				<div className="flex flex-row justify-between ">
					<h1 className="page-title text-primary-dark-gray self-center text-3xl font-bold">
						Dashboard
					</h1>
					<Navbar />
				</div>

				{auth.role === 'admin' && (
					<>
						<div className="infobox-container flex flex-row justify-between gap-5">
							<InfoCard background={'gradient'}>
								<span className="text-sm font-bold uppercase text-white">
									Gross Income
								</span>
								<span className="text-2xl font-bold text-white">
									{formatCurrency(999)}
								</span>
							</InfoCard>
							<InfoCard background={'white'}>
								<span className="text-sm font-bold uppercase text-slate-800">
									Total Capital
								</span>
								<span className="text-2xl font-bold text-slate-800">
									{formatCurrency(999)}
								</span>
							</InfoCard>
							<InfoCard background={'white'}>
								<span className="text-sm font-bold uppercase text-slate-800">
									Total Expenses
								</span>
								<span className="text-2xl font-bold text-slate-800">
									{formatCurrency(999)}
								</span>
							</InfoCard>
							<InfoCard background={'default'}>
								<span className="text-sm font-bold uppercase text-white">
									Net Profit
								</span>
								<span className="text-2xl font-bold text-white">
									{formatCurrency(999)}
								</span>
							</InfoCard>
						</div>
						<div className="row-container flex h-full flex-col gap-6 ">
							<div className="row-container flex flex-row justify-between gap-8">
								<GrossAndNetProfit className="min-h-[440px] max-w-[70%]" />
								<TransferStatus />
							</div>
							<div className="row-container flex h-full flex-row justify-between gap-8">
								<InventoryTable />
								<TopSellingProducts />
							</div>
						</div>
					</>
				)}
			</div>
		</LayoutWrapper>
	);
};

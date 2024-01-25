import GrossAndNetProfit from '@/components/Chart/GrossandNetProfit';
import { InfoCard } from '@/components/InfoCard';
import InventoryTable from '@/components/Tables/Inventory/inventory';
import TopSellingProducts from '@/components/Tables/TopSellingProducts/topSellingProducts';
import TransferStatus from '@/components/Tables/Transfer/Transfer';
import LayoutWrapper from '@/layouts/Layout';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

// interface DashboardProps {
// 	state: Array<unknown>;
// }

export const Dashboard = () => {
	const { state } = useLocation();
	console.log(state);
	
	return (
		<LayoutWrapper >
			<div className="flex h-screen flex-col gap-y-4">
				<h1 className="page-title text-primary-dark-gray text-3xl font-bold">
					Dashboard
				</h1>
				<div className="infobox-container flex flex-row justify-between gap-8">
					<InfoCard background={'gradient'}>
						<span className="text-sm font-bold uppercase text-white">
							Gross Income
						</span>
						<span className="text-2xl font-bold text-white">999</span>
					</InfoCard>
					<InfoCard background={'default'}>
						<span className="text-sm font-bold uppercase text-white">
							Gross Income
						</span>
						<span className="text-2xl font-bold text-white">999</span>
					</InfoCard>
					<InfoCard background={'default'}>
						<span className="text-sm font-bold uppercase text-white">
							Gross Income
						</span>
						<span className="text-2xl font-bold text-white">999</span>
					</InfoCard>
					<InfoCard background={'default'}>
						<span className="text-sm font-bold uppercase text-white">
							Gross Income
						</span>
						<span className="text-2xl font-bold text-white">999</span>
					</InfoCard>
				</div>
				<div className="row-container flex h-full flex-col gap-6 ">
					<div className="row-container flex flex-row justify-between gap-8">
						<GrossAndNetProfit />
						<TransferStatus />
					</div>
					<div className="row-container flex h-full flex-row justify-between gap-8">
						<InventoryTable />
						<TopSellingProducts />
					</div>
				</div>
			</div>
		</LayoutWrapper>
	);
};

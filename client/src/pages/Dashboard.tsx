import GrossAndNetProfit from '@/components/Chart/GrossandNetProfit';
import { InfoCard } from '@/components/InfoCard';
import LayoutWrapper from '@/layouts/Layout';

const Dashboard = () => {
	return (
		<LayoutWrapper className="block">
			<div className="flex flex-col gap-y-4">
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
					</div>
				</div>
			</div>
		</LayoutWrapper>
	);
};
export default Dashboard;

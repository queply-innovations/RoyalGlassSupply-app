import { InfoCard } from '@/components/InfoCard';
import LayoutWrapper from '@/layouts/Layout';

const Dashboard = () => {
	return (
		<LayoutWrapper>
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
					{/* <InfoBox
					title="Net Profit"
					amount="999.00"
					bgColor="white"
					titleTextColor="black"
					amountTextColor="black"
				/>
				<InfoBox
					title="Sales Return"
					amount="999.00"
					bgColor="white"
					titleTextColor="black"
					amountTextColor="red"
				/>
				<InfoBox
					title="Total Capital"
					amount="999.00"
					bgColor="gray"
					titleTextColor="white"
					amountTextColor="white"
				/> */}
				</div>
				<div className="row-container flex flex-row justify-between gap-8">
					{/* <GrossAndNetProfit /> */}
				</div>
			</div>
		</LayoutWrapper>
	);
};
export default Dashboard;

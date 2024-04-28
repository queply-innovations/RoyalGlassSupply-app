import { CreateOrderTable } from '@/features/pos/__test__/components';
import { Navbar } from '@/features/pos/__test__/components/Navbar/Navbar';
import { SearchProductItems } from '@/features/pos/__test__/components/Searchbar/SearchProductItems';
import {
	SidebarContainer,
	DialogContainer,
} from '@/features/pos/__test__/components/Sidebar/Container';

interface PointOfSalePageProps {}

export const PointOfSalePage = ({}: PointOfSalePageProps) => {
	return (
		<>
			<div className="flex flex-row">
				<Navbar />
				<div className="flex w-screen flex-row">
					<div className="flex flex-1 flex-col gap-6 p-6">
						<SearchProductItems />
						<CreateOrderTable />
					</div>
					<SidebarContainer />
					<DialogContainer />
				</div>
			</div>
		</>
	);
};

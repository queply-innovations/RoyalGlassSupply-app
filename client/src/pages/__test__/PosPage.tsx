import { CreateOrderTable } from '@/features/pos/__test__/components';
import { Navbar } from '@/features/pos/__test__/components/Navbar/Navbar';
import { SearchItems } from '@/features/pos/__test__/components/Searchbar/SearchItems';
import {
	SidebarContainer,
	DialogContainer,
} from '@/features/pos/__test__/components/Sidebar/Container';

interface PointOfSalePageProps {}

export const PointOfSalePage = ({}: PointOfSalePageProps) => {
	return (
		<>
			<div className="flex h-full flex-row">
				<Navbar />
				<div className="flex h-full w-screen flex-row">
					<div className="flex h-full flex-1 flex-col gap-6 p-6">
						{/* <SearchProductItems /> */}
						<SearchItems />
						<CreateOrderTable />
					</div>
					<SidebarContainer />
					<DialogContainer />
				</div>
			</div>
		</>
	);
};

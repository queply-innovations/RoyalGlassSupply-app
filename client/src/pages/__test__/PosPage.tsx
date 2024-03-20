import { Header } from '@/features/pos/__test__/components/Header/Header';
import { Navbar } from '@/features/pos/__test__/components/Navbar/Navbar';
import { CreateOrderTable } from '@/features/pos/__test__/components/Table/CreateOrderTable';
import { Sidebar } from '@/features/pos/__test__/components/Sidebar/Sidebar';
import { PosTable } from '@/features/pos/__test__/components/Table/PosTable';
import {
	PosProvider,
	usePos,
} from '@/features/pos/__test__/context/PosContext';
import { SearchBar } from '@/features/pos/__test__/components/Searchbar';
import { InvoiceProvider } from '@/features/invoice/__test__/context/InvoiceContext';
import { CustomerProvider } from '@/features/customer/__test__/context/CustomerContext';

interface PointOfSalePageProps {}

export const PointOfSalePage = ({}: PointOfSalePageProps) => {
	return (
		<>
			<PosProvider>
				<CustomerProvider>
					<InvoiceProvider>
						<div className="flex flex-row">
							<Navbar />
							<div id="main" className="flex w-screen flex-row">
								<div className="flex flex-1 flex-col gap-6 p-6">
									<SearchBar />
									<CreateOrderTable />
								</div>
								<Sidebar />
							</div>
						</div>
					</InvoiceProvider>
				</CustomerProvider>
			</PosProvider>
		</>
	);
};

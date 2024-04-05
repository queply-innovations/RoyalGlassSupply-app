import { Navbar } from '@/features/pos/__test__/components/Navbar/Navbar';
import { CreateOrderTable } from '@/features/pos/__test__/components/Table/CreateOrderTable';
import { Sidebar } from '@/features/pos/__test__/components/Sidebar/Sidebar';
import { PosProvider } from '@/features/pos/__test__/context/__test__/PosContext';
import { SearchProducts } from '@/features/pos/__test__/components/SearchProducts';
import { InvoiceProvider } from '@/features/invoice/__test__/context/InvoiceContext';
import { CustomerProvider } from '@/features/customer/__test__/context/CustomerContext';
import { InventoryProdsProvider } from '@/features/inventory/context';
import { ProductPricesProvider } from '@/features/product/__test__';

interface PointOfSalePageProps {}

export const PointOfSalePage = ({}: PointOfSalePageProps) => {
	return (
		<>
			<InventoryProdsProvider>
				<ProductPricesProvider>
					<InvoiceProvider>
						<CustomerProvider>
							<PosProvider>
								<div className="flex flex-row">
									<Navbar />
									<div id="main" className="flex w-screen flex-row">
										<div className="flex flex-1 flex-col gap-6 p-6">
											<SearchProducts />
											<CreateOrderTable />
										</div>
										<Sidebar />
									</div>
								</div>
							</PosProvider>
						</CustomerProvider>
					</InvoiceProvider>
				</ProductPricesProvider>
			</InventoryProdsProvider>
		</>
	);
};

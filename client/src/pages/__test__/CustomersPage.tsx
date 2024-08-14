import { MainLayout } from '@/layouts/MainLayout';
import { CustomersProvider } from '@/features/customers/context/CustomersContext';
import CustomersTable from '@/features/customers/components/CustomersTable';

export const Customers = () => {
	return (
		<>
			<MainLayout title="Customer Sales">
				<CustomersProvider>
					<div className="flex h-full flex-1 flex-col gap-5 rounded-xl border border-black/10 bg-white p-4">
						<div className="max-h-full w-full flex-1 rounded-md border border-black/10">
							<CustomersTable />
						</div>
					</div>
				</CustomersProvider>
			</MainLayout>
		</>
	);
};

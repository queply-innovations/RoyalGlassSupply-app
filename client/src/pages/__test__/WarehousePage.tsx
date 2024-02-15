import { Button, Inputbox } from '@/components';
import { WarehouseTable } from '@/features/warehouse/__test__/components/WarehouseTable';
import { WarehouseProvider } from '@/features/warehouse/__test__/context/WarehouseContext';
import { CommonLayout } from '@/layouts/CommonLayout';
// import { MainLayout } from '@/layouts/MainLayout';

export const Warehouse = () => {
	return (
		<>
			<CommonLayout title="Warehouse">
				<WarehouseProvider>
					<div className="flex flex-auto flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="flex flex-row justify-between">
							<Inputbox
								placeholder="Search"
								variant={'searchbar'}
								buttonIcon={'outside'}
								className="w-1/2"
							/>
							<div className="flex flex-row gap-3">
								<Button
									fill={'green'}
									// onClick={openModal}>
								>
									Add Warehouse
								</Button>
							</div>
						</div>
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<WarehouseTable />
						</div>
					</div>
				</WarehouseProvider>
			</CommonLayout>
		</>
	);
};

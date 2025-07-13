import { useWarehouses } from '@/api/Warehouse';
import { WarehouseContext } from '../context/WarehouseContext';
import { ContentLayout } from '@/components/Layout/ContentLayout';
import WarehouseTable from '../components/WarehouseTable';

export const Warehouse = () => {
	const { data: warehouse } = useWarehouses();

	return (
		<>
			<ContentLayout title="Warehouse">
				<WarehouseContext.Provider value={warehouse}>
					<div className="flex flex-auto flex-col gap-5 rounded-lg border border-black/10 bg-white p-5">
						<div className="h-full w-full overflow-x-hidden rounded-lg border border-black/10">
							<WarehouseTable />
						</div>
					</div>
				</WarehouseContext.Provider>
			</ContentLayout>
		</>
	);
};

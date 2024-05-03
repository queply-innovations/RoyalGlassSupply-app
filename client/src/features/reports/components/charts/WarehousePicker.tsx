import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useReportAnalytics } from '../../context/ReportAnalyticsContext';
import { useWarehouseQuery } from '@/features/warehouse/__test__/hooks';

export const WarehousePicker = () => {
	const { warehouseId, setWarehouseId } = useReportAnalytics();

	// Fetch warehouses
	const { warehouses } = useWarehouseQuery();

	return (
		<>
			<Select
				value={warehouseId?.toString()}
				onValueChange={value => {
					if (value !== '0') {
						setWarehouseId(Number(value));
					} else {
						setWarehouseId(0);
					}
				}}
			>
				<SelectTrigger className="w-44">
					<SelectValue placeholder="Select warehouse...">
						<span className="text-slate-600">
							{warehouses.find(warehouse => warehouse.id === warehouseId)
								?.name ?? 'All'}
						</span>
					</SelectValue>
				</SelectTrigger>
				<SelectContent>
					<SelectItem
						key="all-warehouses-item"
						value="0"
						className="text-sm font-medium"
					>
						All
					</SelectItem>
					{warehouses &&
						warehouses.map(warehouse => (
							<SelectItem
								key={`${warehouse.id}-item`}
								value={warehouse.id.toString()}
								className="text-sm font-medium"
							>
								{warehouse.name}
							</SelectItem>
						))}
				</SelectContent>
			</Select>
		</>
	);
};

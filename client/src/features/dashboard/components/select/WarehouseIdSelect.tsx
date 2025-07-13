import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useDashboardReportsContext } from '../../context/DashboardReportsContext';

export const WarehouseIdSelect = () => {
	const { warehouseId, setWarehouseId } = useDashboardReportsContext();

	return (
		<Select
			value={warehouseId.toString()}
			onValueChange={value => {
				setWarehouseId(Number(value));
			}}
		>
			<SelectTrigger className="w-44">
				<SelectValue placeholder="Select a warehouse..." />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Warehouse</SelectLabel>
					<SelectItem value="1">Cagayan de Oro</SelectItem>
					<SelectItem value="2">Iligan</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

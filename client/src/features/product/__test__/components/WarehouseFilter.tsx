import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useProductPricesPaginated } from '../context/ProductPricesPaginatedContext';

export const WarehouseFilter = () => {
	const {
		warehouse_id,
		setWarehouseId,
		pagination,
		setPagination,
		isFetching,
	} = useProductPricesPaginated();

	return (
		<Select
			value={warehouse_id?.toString() ?? '0'}
			onValueChange={value => {
				setPagination({ ...pagination, pageIndex: 0 });
				setWarehouseId(value === '0' ? null : Number(value));
			}}
			disabled={isFetching}
		>
			<SelectTrigger className="w-[300px] text-sm font-medium">
				<SelectValue placeholder="All" />
			</SelectTrigger>
			<SelectContent className="text-sm font-medium capitalize">
				<SelectItem key="all" value="0">
					All
				</SelectItem>
				<SelectItem key="cdo-filter" value="1">
					Cagayan de Oro
				</SelectItem>
				<SelectItem key="ili-filter" value="2">
					Iligan
				</SelectItem>
			</SelectContent>
		</Select>
	);
};

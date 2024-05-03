import { useQuery } from '@tanstack/react-query';
import { fetchInventoryLevelReport } from '../api/Reports';

export const useInventoryLevelReportQuery = (warehouseId: number) => {
	const { data, isFetching } = useQuery({
		queryKey: ['inventoryLevelReport', warehouseId],
		queryFn: () => fetchInventoryLevelReport(warehouseId),
		refetchOnWindowFocus: false,
	});

	return { data, isFetching };
};

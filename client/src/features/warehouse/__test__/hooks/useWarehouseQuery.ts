import { useQuery } from '@tanstack/react-query';
import { fetchWarehouses } from '../api/Warehouse';
import { useEffect, useState } from 'react';
import { Warehouse } from '../types';

export const useWarehouseQuery = () => {
	const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
	const warehouseQuery = useQuery({
		queryKey: ['warehouses'],
		queryFn: () => fetchWarehouses(),
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		const { data: warehouse } = warehouseQuery;
		if (warehouse) {
			setWarehouses(warehouse);
		}
	}, [warehouseQuery]);

	return { warehouses, warehouseQuery };
};

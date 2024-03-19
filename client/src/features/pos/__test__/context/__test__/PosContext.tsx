import { useAuth } from '@/context/AuthContext';
import {
	useInventoryProductWarehouseQuery,
	useInventoryQueryByWarehouseId,
} from '@/features/inventory/hooks';
import { InventoryProduct } from '@/features/inventory/types';
import { Warehouse } from '@/features/warehouse/__test__/types';
import { ReactNode, createContext, useEffect, useState } from 'react';

interface PosContextProps {
	selectedWarehouse: Partial<Warehouse>;
	setSelectedWarehouse: (warehouse: Partial<Warehouse>) => void;

	inventoryProducts: InventoryProduct[];
}

interface PosProviderProps {
	children: ReactNode;
}

const PosContext = createContext<PosContextProps | undefined>(undefined);

export const PosProvider = ({ children }: PosProviderProps) => {
	const { auth } = useAuth();

	const [selectedWarehouse, setSelectedWarehouse] = useState<
		Partial<Warehouse>
	>({ id: 1, code: 'CDO' } as Warehouse);

	const { data: inventories, isLoading: inventoryQueryLoading } =
		useInventoryProductWarehouseQuery(selectedWarehouse.id || 1);

	useEffect(() => {
		auth.role === 'admin'
			? setSelectedWarehouse({ id: 1, code: 'CDO' } as Warehouse)
			: setSelectedWarehouse({ id: 2, code: 'ILI' } as Warehouse);
	}, []);

	const value = {
		inventoryProducts: inventories,
		selectedWarehouse,
		setSelectedWarehouse,
	};
	return <PosContext.Provider value={value}>{children}</PosContext.Provider>;
};

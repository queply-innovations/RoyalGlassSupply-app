import { ReactNode, createContext, useContext, useState } from 'react';
import { Warehouse } from '../types';
import { useWarehouseQuery } from '../../__test__/hooks';

interface WarehouseContextProps {
	warehouses: Warehouse[];
	warehouseSelected: Warehouse;
	setWarehouseSelected: (warehouse: Warehouse) => void;
	isFetching: boolean;
	progress: any;
}

interface WarehouseProviderProps {
	children: ReactNode;
}

const WarehouseContext = createContext<WarehouseContextProps | undefined>(
	undefined,
);

export const WarehouseProvider = ({ children }: WarehouseProviderProps) => {
	const { warehouses, isFetching, progress } = useWarehouseQuery();
	const [warehouseSelected, setWarehouseSelected] = useState<Warehouse>({
		id: 0,
		code: '',
		name: '',
		location: '',
	});

	const value = {
		warehouses,
		warehouseSelected,
		setWarehouseSelected,
		isFetching,
		progress
	};

	return (
		<WarehouseContext.Provider value={value}>
			{children}
		</WarehouseContext.Provider>
	);
};

export function useWarehouse() {
	const context = useContext(WarehouseContext);

	if (!context) {
		throw new Error(
			'useWarehouseContext must be used within WarehouseContext',
		);
	}
	return context;
}

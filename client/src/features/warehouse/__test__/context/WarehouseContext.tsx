import { ReactNode, createContext, useContext } from 'react';
import { Warehouse } from '../types';
import { useWarehouseQuery } from '../../__test__/hooks';

export const WarehouseContext = createContext<Warehouse[] | undefined>(
	undefined,
);

interface WarehouseProviderProps {
	children: ReactNode;
}

export const WarehouseProvider = ({ children }: WarehouseProviderProps) => {
	const { warehouses } = useWarehouseQuery();

	return (
		<WarehouseContext.Provider value={warehouses}>
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

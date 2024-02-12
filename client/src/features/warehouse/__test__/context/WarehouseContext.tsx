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
	const { data: warehouse } = useWarehouseQuery();

	return (
		<WarehouseContext.Provider value={warehouse}>
			{children}
		</WarehouseContext.Provider>
	);
};

export function useWarehouseContext() {
	const warehouse = useContext(WarehouseContext);

	if (!warehouse) {
		throw new Error(
			'useWarehouseContext must be used within WarehouseContext',
		);
	}
	return warehouse;
}

import { createContext, useContext } from 'react';
import { Warehouse } from '../__test__/types';

export const WarehouseContext = createContext<Warehouse | undefined>(undefined);

export function useWarehouseContext() {
	const warehouse = useContext(WarehouseContext);

	if (!warehouse) {
		throw new Error(
			'useWarehouseContext must be used within WarehouseContext',
		);
	}
	return warehouse;
}

import { Warehouse } from '@/entities/Warehouse';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useWarehouseContext } from '../context/WarehouseContext';

interface WarehouseFormProps {
	isUpdate?: boolean;
}

const WarehouseForm = ({ isUpdate = false }: WarehouseFormProps) => {
	const queryClient = useQueryClient();
	const warehouse = useWarehouseContext();
	const [warehouseForm, setWarehouseForm] = useState<Warehouse[] | null>(null);

	useEffect(() => {
		if (isUpdate && warehouse) {
			setWarehouseForm(warehouse);
		}
	}, [isUpdate, warehouse]);

	return;
};

export default WarehouseForm;

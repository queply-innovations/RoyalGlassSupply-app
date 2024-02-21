import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	addWarehouse,
	removeWarehouse,
	updateWarehouse,
} from '../api/Warehouse';
import { useWarehouse } from '../context/WarehouseContext';
import { useState, ChangeEvent } from 'react';
import { Warehouse } from '../types';

export const useWarehouseMutation = () => {
	const queryClient = useQueryClient();
	const warehouse = useWarehouse();

	// State to store warehouse form data
	const [warehouseForm, setWarehouseForm] = useState<Warehouse>({
		id: warehouse.length + 1 || 0,
	} as Warehouse);

	// Function to handle form input changes
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setWarehouseForm(prevWarehouseForm => ({
			...(prevWarehouseForm as Warehouse),
			[name]: value,
		}));
	};

	// Configurations for mutation
	const mutationConfig = {
		onSuccess: async () => {
			// Reset loading state
			await queryClient.invalidateQueries({ queryKey: ['warehouses'] });
			// Reset form data
			setWarehouseForm({
				id: warehouse.length + 1 || 0,
				name: '',
				location: '',
			} as Warehouse);
		},
		onError: (error: any) => {
			console.error('Warehouse Data failed', error);
		},
	};

	const { mutateAsync: removeWarehouseMutation } = useMutation({
		mutationKey: ['removeWarehouse'],
		mutationFn: removeWarehouse,
		...mutationConfig,
	});

	const { mutateAsync: addWarehouseMutation } = useMutation({
		mutationKey: ['addWarehouse'],
		mutationFn: addWarehouse,
		...mutationConfig,
	});

	const { mutateAsync: updateWarehouseMutation } = useMutation({
		mutationKey: ['updateWarehouse'],
		mutationFn: updateWarehouse,
		...mutationConfig,
	});

	return {
		removeWarehouseMutation,
		addWarehouseMutation,
		updateWarehouseMutation,
	};
};

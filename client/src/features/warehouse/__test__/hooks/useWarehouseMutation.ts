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
	const [value, setValue] = useState<Warehouse>({
		id: warehouse.length + 1 || 0,
		code: '',
		name: '',
		location: '',
	} as Warehouse);

	// Function to handle form input changes
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValue(prevWarehouseForm => ({
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
			setValue({
				id: warehouse.length + 1 || 0,
				code: '',
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
		// * This function will call removeWarehouse from API to remove the warehouse
		mutationFn: removeWarehouse,
		...mutationConfig,
	});

	const { mutateAsync: addWarehouseMutation } = useMutation({
		mutationKey: ['addWarehouse'],
		// * This function will call addWarehouse from API to add the warehouse
		mutationFn: addWarehouse,
		...mutationConfig,
	});

	const { mutateAsync: updateWarehouseMutation } = useMutation({
		mutationKey: ['updateWarehouse'],
		// * This function will call updateWarehouse from API to update the warehouse
		mutationFn: updateWarehouse,
		...mutationConfig,
	});

	return {
		value,
		setValue,
		handleChange,
		removeWarehouseMutation,
		addWarehouseMutation,
		updateWarehouseMutation,
	};
};

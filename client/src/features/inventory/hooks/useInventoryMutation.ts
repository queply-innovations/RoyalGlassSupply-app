import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addInventory } from '../api/Inventory';
import { InventoryDatabase } from '../types';
import { useState } from 'react';

export const useInventoryMutation = () => {
	const queryClient = useQueryClient();
	// State handling for the form
	const [value, setValue] = useState({} as Partial<InventoryDatabase>);

	// Handle change for the form
	// Append changes to the state
	const handleChange = (
		key: string,
		_value: InventoryDatabase[keyof InventoryDatabase],
	) => {
		setValue(prev => ({
			...prev,
			[key]: _value,
		}));
	};

	// Handle submit for the form
	const handleSubmit = async (
		data: Partial<Omit<InventoryDatabase, 'id'>>,
	) => {
		console.log('Submitting: ', data);
		return await addInventoryMutation(data);
	};

	const mutationConfig = {
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['inventoryData'],
			});
		},
		onError: (error: any) => {
			console.error('Inventory Data failed', error);
		},
	};

	const { mutateAsync: addInventoryMutation } = useMutation({
		mutationKey: ['addInventory'],
		mutationFn: addInventory,
		...mutationConfig,
	});

	return {
		value,
		setValue,
		handleChange,
		handleSubmit,
	};
};

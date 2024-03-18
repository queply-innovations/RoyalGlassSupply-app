import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addInventory, patchInventory } from '../api/Inventory';
import { InventoryDatabase } from '../types';
import { useState } from 'react';

type handleSubmitArgs =
	| { action: 'add'; data: Partial<Omit<InventoryDatabase, 'id'>> }
	| {
			action: 'update';
			id: number;
			data: Partial<Omit<InventoryDatabase, 'id'>>;
	  };

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
	const handleSubmit = async (args: handleSubmitArgs) => {
		console.log('Submitting: ', args);
		if (args.action === 'add') {
			return await addInventoryMutation(args.data);
		} else if (args.action === 'update') {
			return await patchInventoryMutation({ id: args.id, data: args.data });
		} else {
			const message =
				'No data to submit. Function requires at least one parameter.';
			console.error(message);
			return { status: 400, data: message };
		}
	};

	const mutationConfig = {
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['inventory'],
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

	const { mutateAsync: patchInventoryMutation } = useMutation({
		mutationKey: ['patchInventory'],
		mutationFn: patchInventory,
		...mutationConfig,
	});

	return {
		value,
		setValue,
		handleChange,
		handleSubmit,
	};
};

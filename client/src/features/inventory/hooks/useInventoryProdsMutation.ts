import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	addInventoryProducts,
	patchInventoryProduct,
	deleteInventoryProduct,
} from '../api/Inventory';
import { InventoryProductDatabase } from '../types';
import { useState } from 'react';

type handleSubmitArgs =
	| { action: 'add'; data: InventoryProductDatabase[] }
	| { action: 'update'; id: number; data: Partial<InventoryProductDatabase> };

export const useInventoryProdsMutation = () => {
	const queryClient = useQueryClient();
	const [value, setValue] = useState({} as Partial<InventoryProductDatabase>);

	// Handle change for the form
	// Append changes to the state
	const handleChange = (
		key: string,
		_value: InventoryProductDatabase[keyof InventoryProductDatabase],
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
			return await addInventoryProductsMutation(args.data);
		} else if (args.action === 'update') {
			return await patchInventoryProductMutation({
				id: args.id,
				data: args.data,
			});
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
				predicate: query => {
					return [
						'inventory',
						'inventoryProducts',
						'inventoryProductById',
						'pendingInventoryProducts',
					].includes(query.queryKey[0] as string);
				},
			});
		},
		onError: (error: any) => {
			console.error('Inventory Product Data failed', error);
		},
	};

	const { mutateAsync: addInventoryProductsMutation } = useMutation({
		mutationKey: ['addInventoryProducts'],
		mutationFn: addInventoryProducts,
		...mutationConfig,
	});

	const { mutateAsync: patchInventoryProductMutation } = useMutation({
		mutationKey: ['patchInventoryProduct'],
		mutationFn: patchInventoryProduct,
		...mutationConfig,
	});

	const { mutateAsync: deleteInventoryProductMutation } = useMutation({
		mutationKey: ['deleteInventoryProduct'],
		mutationFn: deleteInventoryProduct,
		...mutationConfig,
	});

	return {
		value,
		setValue,
		handleChange,
		handleSubmit,
		deleteInventoryProductMutation,
	};
};

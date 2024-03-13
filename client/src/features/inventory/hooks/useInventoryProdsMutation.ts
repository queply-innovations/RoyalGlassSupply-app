import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addInventoryProduct } from '../api/Inventory';
import { InventoryProductDatabase } from '../types';
import { useState } from 'react';

type handleSubmitArgs = {
	action: 'add';
	data: Partial<InventoryProductDatabase>;
};
// | { action: 'batch_add'; data: Partial<InventoryProductDatabase>[] };

// function batchMapItems (data: InventoryProduct[]) = {}

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
			return await addInventoryProductMutation(args.data);
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
				queryKey: ['inventoryProducts'],
			});
		},
		onError: (error: any) => {
			console.error('Inventory Product Data failed', error);
		},
	};

	const { mutateAsync: addInventoryProductMutation } = useMutation({
		mutationKey: ['addInventoryProduct'],
		mutationFn: addInventoryProduct,
		...mutationConfig,
	});

	/**
	 * Mutation to perform batch adding of inventory products.
	 */
	// const { mutateAsync: addInventoryProductBatchMutation } = useMutation({
	// 	mutationKey: ['addInventoryProductBatch'],
	// 	mutationFn: async (data: Partial<InventoryProductDatabase>[]) => {
	// 		return Promise.all(
	// 			data.map(async (prod: Partial<InventoryProductDatabase>) => {
	// 				await addInventoryProductMutation(prod);
	// 			}),
	// 		);
	// 	},
	// });

	return {
		value,
		setValue,
		handleChange,
		handleSubmit,
	};
};

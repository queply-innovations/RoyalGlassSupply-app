import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	addProductListing,
	patchProductListing,
	deleteProductListing,
} from '../api/Products';
import { useState } from 'react';
import { ProductPricesDatabase } from '../types';

// Define type for handleSubmit args
// If action is 'add', data is required
// If action is 'update', id and data is required
type handleSubmitArgs =
	| { action: 'add'; data: Partial<ProductPricesDatabase> }
	| { action: 'update'; id: number; data: Partial<ProductPricesDatabase> };

export const useProductPricesMutation = () => {
	const queryClient = useQueryClient();

	const [value, setValue] = useState<Partial<ProductPricesDatabase>>(
		{} as Partial<ProductPricesDatabase>,
	);

	/**
	 * Handles the change of a key-value pair in the mutation state.
	 * @param key - The key of the value to be changed.
	 * @param _value - The new value to be assigned to the key.
	 */
	const handleChange = (
		key: string,
		_value: ProductPricesDatabase[keyof ProductPricesDatabase],
	) => {
		setValue(prev => ({
			...prev,
			[key]: _value,
		}));
	};

	/**
	 * Handles the form submission for adding or updating product prices/listings.
	 *
	 * @param args - Object data for the form submission.
	 * @returns Object `{status: response number, data: submitted data }`.
	 */
	const handleSubmit = async (args: handleSubmitArgs) => {
		console.log('Submitting: ', args);
		if (args.action === 'add') {
			return await addProductPricesMutation(args.data);
		} else if (args.action === 'update') {
			return await patchProductPricesMutation({
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
						'productPrices',
						'pendingProductPrices',
						'approvedProductPrices',
						'productPricesTEST',
					].includes(query.queryKey[0] as string);
				},
			});

			setValue({} as Partial<ProductPricesDatabase>);
		},
		onError: (error: any) => {
			console.error('Product Prices Data failed', error);
		},
	};

	const { mutateAsync: addProductPricesMutation } = useMutation({
		mutationKey: ['addProductListing'],
		mutationFn: addProductListing,
		...mutationConfig,
	});

	const { mutateAsync: patchProductPricesMutation } = useMutation({
		mutationKey: ['patchProductListing'],
		mutationFn: patchProductListing,
		...mutationConfig,
	});

	const { mutateAsync: deleteProductPricesMutation } = useMutation({
		mutationKey: ['deleteProductListing'],
		mutationFn: deleteProductListing,
		...mutationConfig,
	});

	return {
		value,
		setValue,
		handleChange,
		handleSubmit,
		addProductPricesMutation,
		patchProductPricesMutation,
		deleteProductPricesMutation,
	};
};

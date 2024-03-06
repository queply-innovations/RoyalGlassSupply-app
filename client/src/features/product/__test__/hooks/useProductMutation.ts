import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, fetchProductPrices, addProduct } from '../api/Products';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';
import { useState } from 'react';

type handleSubmitArgs =
	| { action: 'add'; data: Partial<Omit<Product, 'id'>> }
	| { action: 'update'; id: number; data: Partial<Product> };

export const useProductMutation = () => {
	const queryClient = useQueryClient();

	const [value, setValue] = useState({} as Partial<Product>);

	const handleChange = (key: string, _value: Product[keyof Product]) => {
		setValue(prev => ({
			...prev,
			[key]: _value,
		}));
	};

	const handleSubmit = async (args: handleSubmitArgs) => {
		console.log('Submitting: ', args);
		if (args.action === 'add') {
			return await addProductMutation(args.data);
			// } else if (args.action === 'update') {
			//     return await patchProductMutation({
			//         id: args.id,
			//         data: args.data,
			//     });
		} else {
			const message =
				'No data to submit. Function requires at least one parameter.';
			console.error(message);
			return { status: 400, data: message };
		}
	};

	// Configurations for mutation
	const mutationConfig = {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['productData'] });
		},
		onError: (error: any) => {
			console.error('Product Data failed', error);
		},
	};

	const { mutateAsync: addProductMutation } = useMutation({
		mutationKey: ['addProductListing'],
		mutationFn: addProduct,
		...mutationConfig,
	});

	// TODO: Create an add, edit, and remove mutation functions

	return { value, setValue, handleChange, handleSubmit, addProductMutation };
};

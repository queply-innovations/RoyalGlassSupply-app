import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProductListing, patchProductListing } from '../api/Products';
// import { useProductPrices } from '../context/ProductPricesContext';
import { useState, ChangeEvent } from 'react';
import { ProductPrices } from '../types';

interface LimitedProdPrices
	extends Omit<ProductPrices, 'created_at' | 'updated_at'> {}

export const useProductPricesMutation = () => {
	const queryClient = useQueryClient();
	// const { data } = useProductPrices();

	const [value, setValue] = useState<LimitedProdPrices>(
		{} as LimitedProdPrices,
	);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValue(prevProductPriceForm => ({
			...(prevProductPriceForm as LimitedProdPrices),
			[name]: value,
		}));
	};

	const mutationConfig = {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['productPrices'] });

			setValue({} as LimitedProdPrices);
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

	return {
		value,
		setValue,
		handleChange,
		addProductPricesMutation,
		patchProductPricesMutation,
	};
};

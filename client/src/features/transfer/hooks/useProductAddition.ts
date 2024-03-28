import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	addTransfer, addTransferProduct
} from '../api/Transfer';
import { useTransfer } from '../context/TransferContext';
import { useCallback, useEffect, useState } from 'react';
import { TransferProduct } from '../types';
import { useAuth } from '@/context/AuthContext';
import { useProductPricesQuery, useProductQuery } from '@/features/product/__test__/hooks';
import { useInventoryProductsQuery, useInventoryQuery } from '@/features/inventory/hooks';

export const useProductAddition = () => {
	const queryClient = useQueryClient();
	const { transfers, transferProducts, selectedProduct, selectedTransfer } = useTransfer();
	const { auth } = useAuth();
	const { data: allProducts } = useProductQuery();
	const { data: allInventoryProducts } = useInventoryProductsQuery(); 
	const { data: allInventories } = useInventoryQuery();

	const filteredInventoriesSrc = allInventories.filter((inv) => inv.warehouse.id === selectedTransfer.source.id);

	const filteredProductsSrc = allInventoryProducts.filter((prod) => 
		filteredInventoriesSrc.map((inv) => inv.id).includes(prod.inventory_id)
		&& prod.capital_price > 0
		&& (prod.remaining_stocks_count && prod.remaining_stocks_count > 0)
	);

	// console.log(allInventories);
	// console.log(filteredProductsSrc);
	// console.log(filteredInventoriesSrc);
	// console.log(selectedTransfer);

	const [ bundlesLimit, setBundlesLimit ] = useState<number>(0);
	const [ quantityLimit, setQuantityLimit ] = useState<number>(0);
	const [ damagedCount, setDamagedCount ] = useState<number>(0);

	const [ isChanged, setIsChanged ] = useState(false);
	const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
	const [ error, setError ] = useState<string | null>(null);
	const [ success, setSuccess ] = useState<string | null>(null);

	const [ product, setProduct ] = useState({} as TransferProduct);
	useEffect(() => {
		setProduct(prev => ({
			...prev,
			id: transferProducts.length + 1,
			transfer_id: selectedTransfer.id,
		}))
	}, []);

	const handleChange = (e: any) => {
		setIsChanged(true);
		setSuccess(null);
		setError(null);
		setProduct(prev => ({
			...prev,
			[e.target.name]: Number(e.target.value),
		}));
	};

	const handleChangeSelect = (
		key: string,
		_value: number,
		id: number
	) => {
		setIsChanged(true);
		setSuccess(null);
		setError(null);
		const capitalPrice = filteredProductsSrc[id];
		const src = capitalPrice.id;
		const valueSet = capitalPrice.capital_price;
		const bundlesUnit = capitalPrice.bundles_unit;
		const unit = capitalPrice.unit;
		const perBundle = capitalPrice.quantity_per_bundle;
		setProduct(prev => ({
			...prev,
			[key]: _value,
			capital_price: valueSet,
			bundles_unit: bundlesUnit,
			unit: unit,
			quantity_per_bundle: perBundle,
			source_inventory: src,
		}));
		setBundlesLimit(capitalPrice.remaining_stocks_count ? 
			capitalPrice.remaining_stocks_count / capitalPrice.quantity_per_bundle : 0);
		setQuantityLimit(capitalPrice.remaining_stocks_count ?
			capitalPrice.remaining_stocks_count : 0 );
		setDamagedCount(capitalPrice.damage_count);
	};

	useEffect(() => {
		if (product.bundles_count && product.quantity_per_bundle) {
			setProduct(prev => ({
				...prev,
				total_quantity: product.bundles_count * product.quantity_per_bundle,
			}));
		} else {
			setProduct(prev => ({
				...prev,
				total_quantity: 0,
			}));
		}
	}, [product]);

	const isFormValid = () => {
		const headers: Array<Object> = Object.keys(product).map(key => {
			return { text: key }
		});

		const formChecker = headers.length === 10 ? true : false;

		if (formChecker) {
			if (product.bundles_count > bundlesLimit) {
				return [ false, "Bundles count input is greater than the current stock quantity." ]
			} else {
				return [ true, "" ]
			}
		} else {
			return [ formChecker, "Please fill up all fields" ];
		}
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);
		const checker: any = isFormValid();
		if (checker[0]) {
			return await addProductMutation(product);
		} else {
			setError(checker[1]);
			setIsSubmitting(false);
		}
		// return await addProductMutation(product);
		// console.log(product);
	};

	// Configurations for mutation
	const mutationConfig = {
		onSuccess: async () => {
			// Reset loading state
			await queryClient.invalidateQueries({ queryKey: ['transfer-product'] });
			setIsSubmitting(false);
			setIsChanged(false);
			setSuccess('Transfer product has been added');
		},
		onError: (error: any) => {
			console.error(error);
			setError(error.message);
			setIsSubmitting(false);
		},
	};

	const { mutateAsync: addProductMutation } = useMutation({
		mutationKey: ['addTransferProduct'],
		mutationFn: addTransferProduct,
		...mutationConfig,
	});

	return {
		// value,
		// setValue,
		product,
		allProducts,
		allInventoryProducts,
		filteredProductsSrc,
		bundlesLimit,
		quantityLimit,
		damagedCount,
		isChanged,
		isSubmitting,
		error,
		success,
		handleSubmit,
		handleChange,
		handleChangeSelect,
		addProductMutation,
	};
};
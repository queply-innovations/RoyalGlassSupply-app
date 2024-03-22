import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	addTransfer, addTransferProduct
} from '../api/Transfer';
import { useTransfer } from '../context/TransferContext';
import { useCallback, useEffect, useState } from 'react';
import { TransferProduct } from '../types';
import { useAuth } from '@/context/AuthContext';
import { useProductPricesQuery, useProductQuery } from '@/features/product/__test__/hooks';

export const useProductAddition = () => {
	const queryClient = useQueryClient();
	const { transfers, transferProducts, selectedProduct, selectedTransfer } = useTransfer();
	const { auth } = useAuth();
	const { data: allProducts } = useProductQuery();
	const { data: allProductPrices } = useProductPricesQuery(); 
	//TODO: useInventoryProductsQuery instead. para unsay naa sa inventory sa warehouse sa ga add, mao ray iyang ma pilian

	const filteredProductsSrc = allProductPrices.filter((prod) => prod.warehouse.id === selectedTransfer.source.id);
	const filteredProductsActive = filteredProductsSrc.filter((prod) => prod.active_status === 'active' && prod.approval_status === 'approved');

	const [ bundlesLimit, setBundlesLimit ] = useState<number>(0);
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
			source_inventory: selectedTransfer.source.id,
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
	) => {
		setIsChanged(true);
		setSuccess(null);
		setError(null);
		const capitalPrice = allProductPrices.filter((prodPrice) => 
			prodPrice.product.id === _value &&
			prodPrice.active_status === 'active' && 
			prodPrice.approval_status === 'approved' && 
			prodPrice.warehouse.id === selectedTransfer.source.id
		);
		const valueSet = capitalPrice[0] ? capitalPrice[0].capital_price : 0;
		const bundlesUnit = capitalPrice[0] ? capitalPrice[0].stocks_unit : '';
		const unit = capitalPrice[0] ? capitalPrice[0].unit : '';
		setProduct(prev => ({
			...prev,
			[key]: _value,
			capital_price: valueSet,
			bundles_unit: bundlesUnit,
			unit: unit,
		}));
		setBundlesLimit(capitalPrice[0] ? capitalPrice[0].stocks_quantity : 0);
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
		allProductPrices,
		filteredProductsActive,
		bundlesLimit,
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	addTransfer, addTransferProduct, editTransferProduct
} from '../api/Transfer';
import { useTransfer } from '../context/TransferContext';
import { useCallback, useEffect, useState } from 'react';
import { TransferProduct, TransferProductFull } from '../types';
import { useAuth } from '@/context/AuthContext';
import { useProductPricesQuery, useProductQuery } from '@/features/product/__test__/hooks';
import { useInventoryProductsQuery, useInventoryQuery } from '@/features/inventory/hooks';
import { InventoryProduct } from '@/features/inventory/types';

export const useProductAddition = () => {
	const queryClient = useQueryClient();

	const { transfers, transferProducts, selectedProduct, selectedTransfer, addProd } = useTransfer();
	const { auth } = useAuth();
	const { data: allProducts } = useProductQuery();
	const { data: allInventoryProducts } = useInventoryProductsQuery(); 
	const { data: allInventories } = useInventoryQuery();

	const filteredInventoriesSrc = allInventories.filter((inv) => 
		inv.warehouse.id === selectedTransfer.source.id && 
		allInventoryProducts.some((prod) => prod.inventory_id === inv.id)
	);
	// console.log(filteredInventoriesSrc);

	const [ filteredProductsSrc, setFilteredProductsSrc ] = useState<InventoryProduct[]>([]);
	const [ inventoryID, setInventoryID ] = useState<number>(0);
	const [ invCode, setInvCode ] = useState<string>('');
	const [ prodName, setProdName ] = useState<string>(selectedProduct.id ? selectedProduct.product.name : '');

	const [ quantityLimit, setQuantityLimit ] = useState<number>(0);
	const [ damagedCount, setDamagedCount ] = useState<number>(0);
	const [ resetProd, setResetProd ] = useState<boolean>(false);

	const [ isChanged, setIsChanged ] = useState(false);
	const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
	const [ error, setError ] = useState<string | null>(null);
	const [ success, setSuccess ] = useState<string | null>(null);

	const [ product, setProduct ] = useState({} as TransferProduct);

	function resetBothInit() {
		if (selectedProduct.id){
			setProduct(prev => ({
				...prev,
				id: selectedProduct.id,
				transfer_id: selectedProduct.transfer_id,
				unit: selectedProduct.unit,
				source_inventory: inventoryID,
			}))
		} else {
			setProduct(prev => ({
				...prev,
				id: transferProducts.length + 1,
				transfer_id: selectedTransfer.id,
			}))
		}
	}

	useEffect(() => {
		if (addProd){
			setProduct(prev => ({
				...prev,
				id: transferProducts.length + 1,
				transfer_id: selectedTransfer.id,
			}))
		} else {
			setProduct({
				id: selectedProduct.id,
				transfer_id: selectedProduct.transfer_id,
				product_id: selectedProduct.product.id,
				total_quantity: selectedProduct.total_quantity,
				capital_price: selectedProduct.capital_price,
				unit: selectedProduct.unit,
				source_inventory: selectedProduct.source_inventory,
			});
		}
	}, []);

	useEffect(() => {
		if (!addProd) {
			const origData = allInventoryProducts.find((prod) => prod.id === selectedProduct.source_inventory);
			setQuantityLimit(origData?.remaining_stocks_count ? origData.remaining_stocks_count : 0);
			setDamagedCount(origData?.damage_count ? origData.damage_count : 0);
			setInventoryID(selectedProduct.source_inventory);
		}
	}, [allInventoryProducts]);

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
		_value: number | string,
		id?: number
	) => {
		setIsChanged(true);
		setSuccess(null);
		setError(null);
		if (key === "product_id"){
			const capitalPrice = filteredProductsSrc[id];
			setProdName(capitalPrice.product.name);
			const valueSet = capitalPrice.capital_price;
			const unit = capitalPrice.unit;
			const value = Number(_value);
			setProduct(prev => ({
				...prev,
				[key]: value,
				capital_price: valueSet,
				unit: unit,
				source_inventory: inventoryID,
			}));
			setQuantityLimit(capitalPrice.remaining_stocks_count ?
				capitalPrice.remaining_stocks_count : 0 );
			setDamagedCount(capitalPrice.damage_count);
		} else {
			setInvCode(_value.toString());
			const invID = filteredInventoriesSrc.filter((inv) => inv.code === _value)[0].id;
			setInventoryID(invID);
			setProdName('');
			if (product.capital_price) {
				setResetProd(true);
				setProduct({} as TransferProduct);
			}
		}
	};

	// useEffect(() => {
	// 	console.log(product);
	// }, [product]);

	// useEffect(() => {
	// 	console.log(invCode);
	// }, [invCode]);

	useEffect(() => {
		if (resetProd === true) {
			setResetProd(false);
			resetBothInit();
		}
	}, [resetProd]);

	useEffect(() => {
		if (allInventoryProducts.length != 0){
			setFilteredProductsSrc(
				allInventoryProducts.filter((prod) => 
					prod.inventory_id === inventoryID
						&& (prod.remaining_stocks_count && prod.remaining_stocks_count > 0)
				)
			);
		}
	}, [inventoryID, allInventoryProducts]);

	const isFormValid = () => {
		const headers: Array<Object> = Object.keys(product).map(key => {
			return { text: key }
		});

		console.log(headers.length);

		const formChecker = headers.length === 7 ? true : false;

		if (formChecker) {
			if (product.total_quantity > quantityLimit) {
				return [ false, "Quantity input is greater than the current stock quantity." ]
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
			if (addProd) {
				return await addProductMutation(product);
			} else {
				return await editProductMutation(product);
			}
		} else {
			setError(checker[1]);
			setIsSubmitting(false);
		}
	};

	// Configurations for mutation
	const mutationConfig = {
		onSuccess: async () => {
			// Reset loading state
			await queryClient.invalidateQueries({ queryKey: ['transfer_products'] });
			setIsSubmitting(false);
			setIsChanged(false);
			if (addProd) {
				setSuccess('Transfer product has been added');
			} else {
				setSuccess('Transfer product has been edited');
			}
			
		},
		onError: (error: any) => {
			console.error(error);
			setError(error.message);
			setIsSubmitting(false);
		},
	};

	const { mutateAsync: addProductMutation } = useMutation({
		mutationKey: ['transfer_product'],
		mutationFn: addTransferProduct,
		...mutationConfig,
	});

	const { mutateAsync: editProductMutation } = useMutation({
		mutationKey: ['transfer_product'],
		mutationFn: editTransferProduct,
		...mutationConfig,
	});

	return {
		product,
		allProducts,
		allInventoryProducts,
		inventoryID,
		invCode,
		prodName,
		filteredInventoriesSrc,
		filteredProductsSrc,
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
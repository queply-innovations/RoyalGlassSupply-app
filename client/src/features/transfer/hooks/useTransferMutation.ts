import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	editTransfer,
	addInventory,
	updateAddTrfInvProducts,
	initInventoryProduct
} from '../api/Transfer';
import { useTransfer } from '../context/TransferContext';
import { useCallback, useEffect, useState } from 'react';
import { Inventory, Transfer, TransferEdit } from '../types';
import { useAuth } from '@/context/AuthContext';
import { formatUTCDate } from '@/utils/timeUtils';
import { set } from 'react-hook-form';
import { InventoryProduct } from '@/features/inventory/types';
import { fetchInventory, fetchInventoryProductById } from '@/features/inventory/api/Inventory';
import { useProductPricesQuery } from '@/features/product/__test__/hooks';
import { useWarehouseQuery } from '@/features/warehouse/__test__/hooks';
import { useInventoryQuery } from '@/features/inventory/hooks';

export const useTransferMutation = () => {
	const queryClient = useQueryClient();
	const { transfers, transferProducts, selectedTransfer } = useTransfer();

	const filteredTransferProducts = transferProducts.filter((prod) => prod.transfer_id === selectedTransfer.id);

	const { auth } = useAuth();
	const { warehouses } = useWarehouseQuery();

	const [ arrived, setArrived ] = useState<boolean>(false);

	const [ firstStep, setFirstStep ] = useState<boolean>(false);
	const [ secondStep, setSecondStep ] = useState<boolean>(false);
	const [ thirdStep, setThirdStep ] = useState<boolean>(false);
	const [ fourthStep, setFourthStep ] = useState<boolean>(false);

	const [ hasBeenRejected, setHasBeenRejected ] = useState<boolean>(false);

	const { data: inventory } = useInventoryQuery();
	const [ recentInvID, setRecentInvID ] = useState<number>(0);

	const [ isChanged, setIsChanged ] = useState(false);
	const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
	const [ error, setError ] = useState<string | null>(null);
	const [ success, setSuccess ] = useState<string | null>(null);

	const [ dateDisplay, setDateDisplay ] = useState<Date>(new Date());
	const [ dateDisplayArrived, setDateDisplayArrived ] = useState<Date>(new Date());
	const [ keyStore, setKeyStore ] = useState<string>('');
	const [ valueStore, setValueStore ] = useState<any>();

	const lastId = transfers[transfers.length - 1].id + 1;
	const [ transfer, setTransfer ] = useState({} as TransferEdit);
	useEffect(() => {
		if (selectedTransfer){
			setTransfer(({
				id: selectedTransfer.id,
				code: selectedTransfer.code,
				created_by: selectedTransfer.created_by.id,
				source: selectedTransfer.source.id,
				destination: selectedTransfer.destination.id,
				transfer_schedule: selectedTransfer.transfer_schedule,
				approval_status: selectedTransfer.approval_status,
				approved_by: selectedTransfer.approved_by ? selectedTransfer.approved_by.id : null,
				transfer_status: selectedTransfer.transfer_status,
				date_received: selectedTransfer.date_received,
				received_by: selectedTransfer.received_by ? selectedTransfer.received_by.id : null,
				notes: selectedTransfer.notes,
			}));
			setDateDisplay(new Date(selectedTransfer.transfer_schedule));
			selectedTransfer.date_received ? 
				setDateDisplayArrived(new Date(selectedTransfer.date_received)) : 
				setDateDisplayArrived(new Date(selectedTransfer.transfer_schedule));
		}
	}, [selectedTransfer]);

	if (transfer.code == ''){
		const dateCode = transfer.transfer_schedule.split(' ')[0].split('-').join('');
		const addCode = 'TRF-' + selectedTransfer.source.code + '-' + selectedTransfer.destination.code + '-' + dateCode + '-' + lastId;
		setTransfer(prev => ({
			...prev,
			code: addCode,
		}));
	}

	const isFormValid = () => {
		const checker = transfer.source === transfer.destination ? false : true;
		if (checker){
			const checker2 = transfer.transfer_status === 'arrived' ? 
								(transfer.received_by && transfer.date_received ? true : false) : true;
			if (checker2){
				return [ checker2, "" ];
			} else {
				const statement = `Fields you need to fill: ${transfer.received_by ? '' : 'received by'} 
									${!transfer.date_received && !transfer.received_by ? ' and ' : ''}
									${transfer.date_received ? '' : 'date received'}`;
				return [ checker2, statement ];
			}
		} else {
			return [ checker, "You cannot have the same source and destination" ];
		}
	}

	const handleChange = (e: any) => {
		setIsChanged(true);
		setSuccess(null);
		setError(null);
		setTransfer(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleChangeDateTime = (
		key: string,
		_value: Date,
	) => {
		setIsChanged(true);
		setSuccess(null);
		setError(null);
		setKeyStore(key);
		setValueStore(_value);
		if (key === 'transfer_schedule'){
			setDateDisplay(_value);
		} else {
			setDateDisplayArrived(_value);
		}
	};

	useEffect(() => {
		async function savingDate() {
			if (keyStore && valueStore){
				const format = valueStore.getFullYear() + '-' + (valueStore.getMonth() + 1) + '-' + valueStore.getDate() + 
					' ' + valueStore.getHours() + ':' + valueStore.getMinutes() + ':' + valueStore.getSeconds();
				setTransfer(prev => ({
					...prev,
					[keyStore]: format,
				}));
			}
		}
		savingDate();
	}, [dateDisplay, dateDisplayArrived]);

	const handleChangeSelect = (
		key: string,
		_value: any,
	) => {
		console.log(key, _value);
		setIsChanged(true);
		setSuccess(null);
		setError(null);
		setTransfer(prev => ({
			...prev,
			[key]: _value,
		}));
	};

	useEffect(() => {
		if (transfer.approval_status === 'approved'){
			setTransfer(prev => ({
				...prev,
				approved_by: auth.user.id,
			}));
		} else if (transfer.approval_status === 'rejected'){
			setHasBeenRejected(true);
		}
	}, [transfer.approval_status]);

	useEffect(() => {
		if (transfer.transfer_status === 'arrived'){
			setArrived(true);
		} else {
			setArrived(false);
		}
	}, [transfer.transfer_status]);

	useEffect(() => {
		if (firstStep) {
			async function addInvFunc() {
				const destWarehouse = warehouses.filter((warehouse) => warehouse.id === transfer.destination);
				const addInv: Inventory = {
					code: 'INV-' + destWarehouse[0].code + '-TRA-' + 
						selectedTransfer.code.split('-')[3] + '-' + (Number(inventory.length) + 1).toString(),
					warehouse_id: transfer.destination,
					created_by: transfer.created_by,
					date_received: transfer.date_received,
					type: 'transfer',
					transfer_id: transfer.id,
					notes: transfer.notes,
				}
	
				const newInvRes = await addInventoryMutation(addInv); //ADD NEW INVENTORY ENTRY
				setRecentInvID(newInvRes.data.data.id);
			}
			addInvFunc();
		}
	}, [firstStep]);

	async function updAddInvProds(){
		await updateAddTrfInvProducts(filteredTransferProducts, recentInvID) //ADD INV PRODUCTS
		.then(async (response) => {
			setIsSubmitting(false);
			setIsChanged(false);
			setSuccess('Transfer info has been edited');
		})
		.catch(error => {
			console.error('Error updating inventory products:', error);
			throw error;
		});
	}

	useEffect(() => {
		if (recentInvID != 0) {
			updAddInvProds();
		}
	}, [recentInvID]);

	const handleSubmit = async () => {
		const checker: any = isFormValid();
		setIsSubmitting(true);
		if (checker[0]) {
			if (arrived) {
				await editTransferMutation(transfer); //UPDATE TRANSFER DETAILS
			} else {
				return await editTransferMutation(transfer);
			}
		} else {
			setError(checker[1]);
			setIsSubmitting(false);
		}
	};

	// Configurations for mutation TRANSFER DETAILS ARE EDITED
	const mutationConfig = {
		onSuccess: async () => {
			// Reset loading state
			await queryClient.invalidateQueries({ queryKey: ['transfers'] });
			if (arrived){
				setFirstStep(true);
			} else {
				if (hasBeenRejected){
					return await initInvTrfProdMutation(filteredTransferProducts); //RE-INSTATTING TRANSFER PRODUCT COUNT
				} else {
					setIsSubmitting(false);
					setIsChanged(false);
					setSuccess('Transfer info has been edited');
				}
			}
		},
		onError: (error: any) => {
			console.error(error);
			setError(error.message);
			setIsSubmitting(false);
		},
	};

	const { mutateAsync: editTransferMutation } = useMutation({
		mutationKey: ['transfers'],
		mutationFn: editTransfer,
		...mutationConfig,
	});

	// Configurations for mutation FOR ADDING INVENTORY ENTRY
	const mutationConfigAddInv = {
		onSuccess: async () => {
			// Reset loading state
			await queryClient.invalidateQueries({ queryKey: ['inventory'] });
			setThirdStep(true);
		},
		onError: (error: any) => {
			console.error(error);
			setError(error.message);
			setIsSubmitting(false);
		},
	};

	const { mutateAsync: addInventoryMutation } = useMutation({
		mutationKey: ['addInventory'],
		mutationFn: addInventory,
		...mutationConfigAddInv,
	});

	// Configurations for mutation FOR REINSTATING TRANSFER PRODUCT COUNT
	const mutationConfigReTrfProd = {
		onSuccess: async () => {
			// Reset loading state
			await queryClient.invalidateQueries({ queryKey: ['transfer_products'] });
			setIsSubmitting(false);
			setIsChanged(false);
			setSuccess('Transfer info has been edited');
		},
		onError: (error: any) => {
			console.error(error);
			setError(error.message);
			setIsSubmitting(false);
		},
	};

	const { mutateAsync: initInvTrfProdMutation } = useMutation({
		mutationKey: ['initInventoryProduct'],
		mutationFn: initInventoryProduct,
		...mutationConfigReTrfProd,
	});

	return {
		// value,
		// setValue,
		transfer,
		selectedTransfer,
		lastId,
		isChanged,
		isSubmitting,
		error,
		success,
		dateDisplay,
		dateDisplayArrived,
		handleSubmit,
		handleChange,
		handleChangeSelect,
		handleChangeDateTime,
		editTransferMutation,
	};
};
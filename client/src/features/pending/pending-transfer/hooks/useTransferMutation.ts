import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	editTransfer
} from '../api/PendingTransfer';
import { usePendingTransfer } from '../context/PendingTransferContext';
import { useCallback, useEffect, useState } from 'react';
import { Transfer, TransferEdit } from '../types';
import { useAuth } from '@/context/AuthContext';
import { formatUTCDate } from '@/utils/timeUtils';
import { set } from 'react-hook-form';

export const useTransferMutation = () => {
	const queryClient = useQueryClient();
	const { transfers } = usePendingTransfer();
	const { selectedTransfer } = usePendingTransfer();
	const { auth } = useAuth();

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
		setIsChanged(true);
		setSuccess(null);
		setError(null);
		setTransfer(prev => ({
			...prev,
			[key]: _value,
		}));
	};

	useEffect(() => {
		if (transfer.approval_status){
			setTransfer(prev => ({
				...prev,
				approved_by: auth.user.id,
			}));
		}
	}, [transfer.approval_status]);

	const handleSubmit = async () => {
		const checker: any = isFormValid();
		setIsSubmitting(true);
		if (checker[0]) {
			return await editTransferMutation(transfer);
		} else {
			setError(checker[1]);
			setIsSubmitting(false);
		}
	};

	// Configurations for mutation
	const mutationConfig = {
		onSuccess: async () => {
			// Reset loading state
			await queryClient.invalidateQueries({ queryKey: ['transfer'] });
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

	const { mutateAsync: editTransferMutation } = useMutation({
		mutationKey: ['editTransfer'],
		mutationFn: editTransfer,
		...mutationConfig,
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
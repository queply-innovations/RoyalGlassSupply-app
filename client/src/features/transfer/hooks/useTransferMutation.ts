import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	editTransfer
} from '../api/Transfer';
import { useTransfer } from '../context/TransferContext';
import { useCallback, useEffect, useState } from 'react';
import { Transfer, TransferEdit } from '../types';
import { useAuth } from '@/context/AuthContext';

export const useTransferMutation = () => {
	const queryClient = useQueryClient();
	const { transfers } = useTransfer();
	const { selectedTransfer } = useTransfer();
	const { auth } = useAuth();

	const lastId = transfers[transfers.length - 1].id + 1;
	const [ transfer, setTransfer ] = useState({} as TransferEdit);
	useEffect(() => {
		setTransfer(prev => ({
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
			received_by: selectedTransfer.received_by.id,
			notes: selectedTransfer.notes,
		}))
	}, []);

	console.log(transfer);

	if (transfer.code == ''){
		const dateCode = transfer.transfer_schedule.split(' ')[0].split('-').join('');
		const addCode = 'TRF-' + selectedTransfer.source.code + '-' + selectedTransfer.destination.code + '-' + dateCode + '-' + lastId;
		setTransfer(prev => ({
			...prev,
			code: addCode,
		}));
	}

	const [ isChanged, setIsChanged ] = useState(false);
	const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
	const [ error, setError ] = useState<string | null>(null);
	const [ success, setSuccess ] = useState<string | null>(null);
	const [ dateDisplay, setDateDisplay ] = useState<Date>(new Date());

	const isFormValid = () => {
		const checker = transfer.source === transfer.destination ? false : true;
		if (checker){
			return [ checker, "" ];
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
		setDateDisplay(_value);
		const format = _value.getFullYear() + '-' + (_value.getMonth() + 1) + '-' + _value.getDate() + 
				' ' + _value.getHours() + ':' + _value.getMinutes() + ':' + _value.getSeconds();
		setTransfer(prev => ({
			...prev,
			transfer_schedule: format,
		}));
	};

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
		handleSubmit,
		handleChange,
		handleChangeSelect,
		handleChangeDateTime,
		editTransferMutation,
	};
};
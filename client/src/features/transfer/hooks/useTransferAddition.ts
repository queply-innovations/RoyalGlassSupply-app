import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	addTransfer
} from '../api/Transfer';
import { useTransfer } from '../context/TransferContext';
import { useCallback, useEffect, useState } from 'react';
import { TransferAdd } from '../types';
import { useAuth } from '@/context/AuthContext';
import { useWarehouseQuery } from '@/features/warehouse/__test__/hooks';

export const useTransferAddition = () => {
	const queryClient = useQueryClient();
	const { transfers } = useTransfer();
	const { auth } = useAuth();
	const { warehouses } = useWarehouseQuery();

	const lastId = transfers[0] ? transfers[transfers.length - 1].id + 1 : 1;

	const [ isChanged, setIsChanged ] = useState(false);
	const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
	const [ error, setError ] = useState<string | null>(null);
	const [ success, setSuccess ] = useState<string | null>(null);
	const [ dateDisplay, setDateDisplay ] = useState<Date | null>(null);
	const [ srcCode, setSrcCode ] = useState<any>();
	const [ dstCode, setDstCode ] = useState<any>();
	const [ dateCode, setDateCode ] = useState<any>();

	const [ transfer, setTransfer ] = useState({} as TransferAdd);
	useEffect(() => {
		setTransfer(prev => ({
			...prev,
			approval_status: "pending",
			created_by: auth.user.id,
			transfer_schedule: '',
		}))
	}, []);

	const isFormValid = () => {
		const headers: Array<Object> = Object.keys(transfer).map(key => {
			return { text: key }
		});

		const formChecker = headers.length === 6 || headers.length > 6 ? true : false;

		if(formChecker){
			const checker = transfer.source === transfer.destination ? false : true;
			if (checker){
				const checker2 = transfer.transfer_schedule === '' ? false : true;
				if (checker2){
					return [ checker2, "" ];
				} else {
					return [ checker2, "Please fill up transfer schedule" ];
				}
			} else {
				return [ checker, "You cannot have the same source and destination" ];
			}
		} else {
			return [ formChecker, "Please fill up all fields" ];
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

		const monthCodeChange = (_value.getMonth() + 1) < 10 ? '0' + (_value.getMonth() + 1).toString() : (_value.getMonth() + 1);
		const dateCodeChange = _value.getDate() < 10 ? '0' + _value.getDate().toString() : _value.getDate();
		setDateCode(_value.getFullYear() + '' + monthCodeChange + '' + dateCodeChange);

		const format = _value.getFullYear() + '-' + (_value.getMonth() + 1) + '-' + _value.getDate() + 
				' ' + _value.getHours() + ':' + _value.getMinutes() + ':' + _value.getSeconds();
		setTransfer(prev => ({
			...prev,
			transfer_schedule: format,
		}));
	};

	const handleChangeSelect = (
		key: string,
		_value: number,
	) => {
		setIsChanged(true);
		setSuccess(null);
		setError(null);
		setTransfer(prev => ({
			...prev,
			[key]: _value,
		}));
		if (key === "source") {
			setSrcCode(warehouses.find(warehouse => warehouse.id === _value)?.code);
		} else {
			setDstCode(warehouses.find(warehouse => warehouse.id === _value)?.code);
		}
	};

	const handleSubmit = async () => {
		if (srcCode && dstCode && dateCode) {
			const addCode = 'TRF-' + srcCode + '-' + dstCode + '-' + dateCode + '-' + lastId;
			setTransfer(prev => ({
				...prev,
				code: addCode,
			}));
		}
	};

	useEffect(() => {
		async function sendingData() {
			if (transfer.code){
				const checker: any = isFormValid();
				setIsSubmitting(true);
				if (checker[0]) {
					return addTransferMutation(transfer);
				} else {
					setError(checker[1]);
					setIsSubmitting(false);
				}
			}
		}
		sendingData();
	}, [transfer.code]);

	// Configurations for mutation
	const mutationConfig = {
		onSuccess: async () => {
			// Reset loading state
			await queryClient.invalidateQueries({ queryKey: ['transfer'] });
			setIsSubmitting(false);
			setIsChanged(false);
			setSuccess('Transfer info has been added');
		},
		onError: (error: any) => {
			console.error(error);
			setError(error.message);
			setIsSubmitting(false);
		},
	};

	const { mutateAsync: addTransferMutation } = useMutation({
		mutationKey: ['addTransfer'],
		mutationFn: addTransfer,
		...mutationConfig,
	});

	return {
		// value,
		// setValue,
		transfer,
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
		addTransferMutation,
	};
};
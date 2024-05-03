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
	const [ dateDisplay, setDateDisplay ] = useState<any>(null);
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
		time: any
	) => {
		setIsChanged(true);
		setSuccess(null);
		setError(null);
		if (time){
			setDateDisplay(time);
			const hourFormat = time.$H < 10 ? '0' + time.$H.toString() : time.$H.toString();
			const minuteFormat = time.$m < 10 ? '0' + time.$m.toString() : time.$m.toString();
			const secondFormat = time.$s < 10 ? '0' + time.$s.toString() : time.$s.toString();
			setTransfer(prev => ({
				...prev,
				transfer_schedule: transfer.transfer_schedule + " " + hourFormat + ":" + minuteFormat + ":" + secondFormat
			}));
		} else {
			setDateDisplay(null);
			setTransfer(prev => ({
				...prev,
				transfer_schedule: transfer.transfer_schedule.split(' ')[0]
			}));
		}
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
		if (key === "source" && _value == 1) {
			setSrcCode(warehouses.find(warehouse => warehouse.id === _value)?.code);
			setDstCode(warehouses.find(warehouse => warehouse.id === _value + 1)?.code);

			setTransfer(prev => ({
				...prev,
				destination: (_value + 1),
			}));
		} else if (key === "source" && _value == 2) {
			setSrcCode(warehouses.find(warehouse => warehouse.id === _value)?.code);
			setDstCode(warehouses.find(warehouse => warehouse.id === _value - 1)?.code);

			setTransfer(prev => ({
				...prev,
				destination: (_value - 1),
			}));
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
			await queryClient.invalidateQueries({ queryKey: ['transfers'] });
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
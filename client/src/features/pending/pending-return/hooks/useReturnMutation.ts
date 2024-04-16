import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useReturn } from '../context';
import { editReturnTransactions } from '../api/ReturnTransactions';
import { ReturnTransactions, ReturnTransactionsRaw } from '../types';

export const useReturnMutation = () => {
	const { selectedReturn } = useReturn();

	const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false);
	const [ error, setError ] = useState<string | null>(null);
	const [ success, setSuccess ] = useState<string | null>(null);

	const [ submitReturn, setSubmitReturn ] = useState<ReturnTransactions>({
		id: selectedReturn.id,
		code: selectedReturn.code,
		invoice_id: selectedReturn.invoice.id,
		issued_by: selectedReturn.issued_by.id,
		refundable_amount: selectedReturn.refundable_amount,
		voucher_id: selectedReturn.voucher ? selectedReturn.voucher.id : null,
		refund_status: 'done',
		created_at: selectedReturn.created_at,
		updated_at: selectedReturn.updated_at,
	});

	const handleSubmit = async () => {
		setIsSubmitting(true);
		await editReturnMutation(submitReturn);
	};

	const mutationConfig = {
		onSuccess: async () => {
			setIsSubmitting(false);
			setSuccess('Return info has been edited');
		},
		onError: (error: any) => {
			console.error(error);
			setError(error.response.data.message);
			setIsSubmitting(false);
		},
	};

	const { mutateAsync: editReturnMutation } = useMutation({
		mutationKey: ['returns'],
		mutationFn: editReturnTransactions,
		...mutationConfig,
	});

	return {
		selectedReturn,
		isSubmitting,
		error,
		success,
		handleSubmit,
	};
};
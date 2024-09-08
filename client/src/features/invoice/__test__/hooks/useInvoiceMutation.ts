import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Invoices } from '../types';
import { useState } from 'react';
import {
	addInvoice,
	removeInvoice,
	updateInvoice,
	updatePendingInvoice,
} from '../api';

export const useInvoiceMutation = () => {
	const queryClient = useQueryClient();

	const [value, setValue] = useState<Partial<Invoices>>(
		{} as Partial<Invoices>,
	);

	const handleChange = (key: string, _value: Invoices[keyof Invoices]) => {
		setValue(prev => ({
			...prev,
			[key]: _value,
		}));
	};

	const selectChange = (id: Partial<Invoices>) => {
		setValue(prevInvoiceForm => ({
			...(prevInvoiceForm as Invoices),
			...id,
		}));
	};

	const mutationConfig = {
		onSuccess: async () => {
			// Reset loading state
			await queryClient.invalidateQueries({ queryKey: ['invoices'] });
			// Reset form data
			setValue({} as Invoices);
		},
		onError: (error: Error) => {
			console.error('Invoices Data failed', error.message);
		},
	};
	const { mutateAsync: addInvoiceMutation } = useMutation({
		mutationKey: ['addInvoice'],
		mutationFn: addInvoice,
		...mutationConfig,
	});

	const { mutateAsync: updateInvoiceMutation } = useMutation({
		mutationKey: ['updateInvoice'],
		mutationFn: updateInvoice,
		...mutationConfig,
	});

	const { mutateAsync: removeInvoiceMutation } = useMutation({
		mutationKey: ['removeInvoice'],
		mutationFn: removeInvoice,
		...mutationConfig,
	});

	const { mutateAsync: updatePendingInvoiceMutation } = useMutation({
		mutationKey: ['updatePendingInvoice'],
		mutationFn: updatePendingInvoice,
		...mutationConfig,
	});

	return {
		value,
		setValue,
		selectChange,
		handleChange,
		addInvoiceMutation,
		updateInvoiceMutation,
		removeInvoiceMutation,
		updatePendingInvoiceMutation,
	};
};

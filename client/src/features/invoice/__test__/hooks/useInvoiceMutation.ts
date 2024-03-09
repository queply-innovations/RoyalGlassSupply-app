import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useInvoice } from '../context/InvoiceContext';
import { Invoices } from '../types';
import { ChangeEvent, useState } from 'react';
import { addInvoice, removeInvoice, updateInvoice } from '../api';
import { useAuth } from '@/context/AuthContext';

export const useInvoiceMutation = () => {
	const queryClient = useQueryClient();
	const { auth } = useAuth();
	const { invoices } = useInvoice();

	const [value, setValue] = useState<Invoices>({} as Invoices);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setValue(prevInvoiceForm => ({
			...(prevInvoiceForm as Invoices),
			[name]: value,
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

	return {
		value,
		setValue,
		selectChange,
		handleChange,
		addInvoiceMutation,
		updateInvoiceMutation,
		removeInvoiceMutation,
	};
};

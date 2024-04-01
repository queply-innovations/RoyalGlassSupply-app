import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Customer } from '../types';
import { useState } from 'react';
import { addCustomer } from '../api/Customer';

export const useCustomerMutation = () => {
	const queryClient = useQueryClient();

	const [value, setValue] = useState<Partial<Customer>>(
		{} as Partial<Customer>,
	);

	const handleChange = (key: string, _value: Customer[keyof Customer]) => {
		setValue(prev => ({
			...prev,
			[key]: _value,
		}));
	};

	const handleSubmit = async (data: Partial<Customer>) => {
		console.log('Submitting: ', data);
		return await addCustomersMutation(data);
	};

	const mutationConfig = {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['customers'] });
			setValue({} as Partial<Customer>);
		},
		onError: (error: Error) => {
			console.error('Error adding customer:', error.message);
		},
	};

	const { mutateAsync: addCustomersMutation } = useMutation({
		mutationKey: ['addCustomer'],
		mutationFn: addCustomer,
		...mutationConfig,
	});

	return {
		value,
		setValue,
		handleChange,
		handleSubmit,
	};
};
